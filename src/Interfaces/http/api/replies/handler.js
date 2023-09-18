const AddReplyToCommentUseCase = require('../../../../Applications/use_case/threads/comments/replies/AddReplyToCommentUseCase');
const SoftDeleteReplyUseCase = require('../../../../Applications/use_case/threads/comments/replies/SoftDeleteReplyUseCase');

class RepliesHandler {
  constructor(container) {
    this._container = container;
  }

  async postReply(req, h) {
    const { id: userId } = req.auth.credentials;
    const { threadId, commentId } = req.params;

    const addReplyToCommentUseCase = this._container.getInstance(
      AddReplyToCommentUseCase.name
    );

    const addedReply = await addReplyToCommentUseCase.execute(
      threadId,
      commentId,
      req.payload,
      userId
    );

    const response = h.response({
      status: 'success',
      data: { addedReply },
    });
    response.code(201);

    return response;
  }

  async deleteReply(req, h) {
    const { id: userId } = req.auth.credentials;
    const { threadId, commentId, replyId } = req.params;

    const softDeleteReplyUseCase = this._container.getInstance(
      SoftDeleteReplyUseCase.name
    );

    await softDeleteReplyUseCase.execute(threadId, commentId, replyId, userId);

    return { status: 'success' };
  }
}

module.exports = RepliesHandler;
