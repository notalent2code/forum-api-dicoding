class ThreadCommentsRepository {
  async addCommentToThread(threadId, newComment, owner) {
    throw new Error('THREAD_COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyCommentAccess(commentId, userId) {
    throw new Error('THREAD_COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async softDeleteCommentById(commentId, userId) {
    throw new Error('THREAD_COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getCommentsFromThread(threadId) {
    throw new Error('THREAD_COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyCommentLocation(commentId, threadId) {
    throw new Error('THREAD_COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ThreadCommentsRepository;
