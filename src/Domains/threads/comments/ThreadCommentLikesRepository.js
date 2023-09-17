class ThreadCommentLikesRepository {
  async likeAComment(commentId, liker) {
    throw new Error('THREAD_COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async dislikeAComment(commentId, liker) {
    throw new Error('THREAD_COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyCommentLike(commentId, liker) {
    throw new Error('THREAD_COMMENT_LIKES_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ThreadCommentLikesRepository;
