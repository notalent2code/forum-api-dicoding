const LikeOrDislikeCommentUsecase = require('../../../../Applications/use_case/threads/comments/LikeOrDislikeCommentUseCase');

class LikesHandler {
  constructor(container) {
    this._container = container;
  }

  async likeOrDislikeComment(req, h) {
    const { id: userId } = req.auth.credentials;
    const { threadId, commentId } = req.params;

    const likeOrDislikeCommentUsecase = this._container.getInstance(
      LikeOrDislikeCommentUsecase.name
    );

    await likeOrDislikeCommentUsecase.execute(threadId, commentId, userId);

    return { status: 'success' };
  }
}

module.exports = LikesHandler;
