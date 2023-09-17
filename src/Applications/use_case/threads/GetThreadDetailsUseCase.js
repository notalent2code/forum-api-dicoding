const Reply = require('../../../Domains/threads/comments/replies/entities/Reply');

class GetThreadDetailsUseCase {
  constructor({
    threadsRepository,
    threadCommentsRepository,
    threadCommentRepliesRepository,
  }) {
    this._threadsRepository = threadsRepository;
    this._threadCommentsRepository = threadCommentsRepository;
    this._threadCommentRepliesRepository = threadCommentRepliesRepository;
  }

  async execute(threadId) {
    const thread = await this._threadsRepository.getThreadById(threadId);
    const rawComments =
      await this._threadCommentsRepository.getCommentsFromThread(threadId);

    const commentIds = rawComments.map((comment) => comment.id);
    const rawRepliesOfComments =
      await this._threadCommentRepliesRepository.getRawRepliesFromComments(
        commentIds
      );

    const comments = rawComments.map((comment) => {
      const rawReplies = rawRepliesOfComments.filter(
        (reply) => reply.commentId === comment.id
      );
      const replies = rawReplies.map((reply) => new Reply(reply));

      return { ...comment, replies };
    });

    return { ...thread, comments };
  }
}

module.exports = GetThreadDetailsUseCase;
