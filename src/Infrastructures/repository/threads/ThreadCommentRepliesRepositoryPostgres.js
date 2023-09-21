const AuthorizationError = require('../../../Commons/exceptions/AuthorizationError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');

const ThreadCommentRepliesRepository = require('../../../Domains/threads/comments/replies/ThreadCommentRepliesRepository');

const AddedReply = require('../../../Domains/threads/comments/replies/entities/AddedReply');

class ThreadCommentRepliesRepositoryPostgres extends ThreadCommentRepliesRepository {
  constructor(pool, idGenerator) {
    super();

    this._pool = pool;
    this._idGenerator = idGenerator;
  }

  async addReplyToComment(commentId, { content }, owner) {
    const id = `reply-${this._idGenerator()}`;

    const query = {
      text: `INSERT INTO thread_comment_replies VALUES(
        $1, $2, $3, $4
      ) RETURNING id, content, owner`,
      values: [id, commentId, content, owner],
    };
    const { rows } = await this._pool.query(query);

    return new AddedReply({ ...rows[0] });
  }

  async verifyReplyAccess(replyId, userId) {
    const query = {
      text: 'SELECT owner FROM thread_comment_replies WHERE id = $1',
      values: [replyId],
    };
    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) throw new NotFoundError('balasan tidak ditemukan');

    if (rows[0].owner !== userId) {
      throw new AuthorizationError(
        'anda tidak dapat mengakses balasan orang lain',
      );
    }
  }

  async softDeleteReply(replyId, userId) {
    await this.verifyReplyAccess(replyId, userId);

    const query = {
      text: `
        UPDATE thread_comment_replies SET is_deleted = TRUE
        WHERE id = $1 RETURNING id
      `,
      values: [replyId],
    };
    await this._pool.query(query);
  }

  async getRawRepliesFromComments(commentIds) {
    const query = {
      text: `
        SELECT
          tcr.id, users.username, 
          tcr.date, tcr.content, 
          tcr.is_deleted AS "isDeleted",
          tcr.comment_id AS "commentId"
        FROM thread_comment_replies AS tcr
        LEFT JOIN users
          ON tcr.owner = users.id
        WHERE comment_id = ANY($1::TEXT[])
        GROUP BY 
          tcr.id, users.username
        ORDER BY date
      `,
      values: [commentIds],
    };
    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) return [];

    return rows;
  }
}

module.exports = ThreadCommentRepliesRepositoryPostgres;
