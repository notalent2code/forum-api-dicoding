const AddCommentToThreadUseCase = require('../../../../Applications/use_case/threads/comments/AddCommentToThreadUseCase');
const SoftDeleteCommentUseCase = require('../../../../Applications/use_case/threads/comments/SoftDeleteCommentUseCase');

class CommentsHandler {
  constructor(container) {
    this._container = container;
  }

  async postComment(req, h) {
    const { id: userId } = req.auth.credentials;
    const { threadId } = req.params;

    const addCommentToThreadUseCase = this._container.getInstance(
      AddCommentToThreadUseCase.name
    );

    const addedComment = await addCommentToThreadUseCase.execute(
      threadId,
      req.payload,
      userId
    );

    const response = h.response({
      status: 'success',
      data: { addedComment },
    });
    response.code(201);

    return response;
  }

  async deleteComment(req, h) {
    const { id: userId } = req.auth.credentials;
    const { threadId, commentId } = req.params;

    const softDeleteCommentUseCase = this._container.getInstance(
      SoftDeleteCommentUseCase.name
    );

    await softDeleteCommentUseCase.execute(threadId, commentId, userId);

    return { status: 'success' };
  }
}

module.exports = CommentsHandler;
