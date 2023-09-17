class ThreadCommentRepliesRepository {
  async addReplyToComment(commentId, newReply, owner) {
    throw new Error('THREAD_COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyReplyAccess(replyId, userId) {
    throw new Error('THREAD_COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async softDeleteReply(replyId, userId) {
    throw new Error('THREAD_COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getRawRepliesFromComments(commentIds) {
    throw new Error('THREAD_COMMENT_REPLIES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ThreadCommentRepliesRepository;
