class LikeOrDislikeCommentUsecase {
  constructor({
    threadsRepository,
    threadCommentsRepository,
    threadCommentLikesRepository,
  }) {
    this._threadsRepository = threadsRepository;
    this._threadCommentsRepository = threadCommentsRepository;
    this._threadCommentLikesRepository = threadCommentLikesRepository;
  }

  async execute(threadId, commentId, liker) {
    await this._threadsRepository.verifyThread(threadId);
    await this._threadCommentsRepository.verifyCommentLocation(
      commentId,
      threadId,
    );

    const isLiked = await this._threadCommentLikesRepository.verifyCommentLike(
      commentId,
      liker,
    );

    if (isLiked) {
      this._threadCommentLikesRepository.dislikeAComment(commentId, liker);
      return;
    }

    this._threadCommentLikesRepository.likeAComment(commentId, liker);
  }
}

module.exports = LikeOrDislikeCommentUsecase;
