const AddThreadsUseCase = require('../../../../Applications/use_case/threads/AddThreadUseCase');
const GetThreadDetailsUseCase = require('../../../../Applications/use_case/threads/GetThreadDetailsUseCase');

const AddCommentToThreadUseCase = require('../../../../Applications/use_case/threads/comments/AddCommentToThreadUseCase');
const SoftDeleteCommentUseCase = require('../../../../Applications/use_case/threads/comments/SoftDeleteCommentUseCase');

const AddReplyToCommentUseCase = require('../../../../Applications/use_case/threads/comments/replies/AddReplyToCommentUseCase');
const SoftDeleteReplyUseCase = require('../../../../Applications/use_case/threads/comments/replies/SoftDeleteReplyUseCase');
const LikeOrDislikeCommentUsecase = require('../../../../Applications/use_case/threads/comments/LikeOrDislikeCommentUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;
  }

  async postThread(req, h) {
    const { id: userId } = req.auth.credentials;

    const addThreadsUseCase = this._container.getInstance(
      AddThreadsUseCase.name
    );

    const addedThread = await addThreadsUseCase.execute(req.payload, userId);

    const response = h.response({
      status: 'success',
      data: { addedThread },
    });
    response.code(201);

    return response;
  }

  async getThreadDetails(req, h) {
    const { threadId } = req.params;

    const getThreadDetails = this._container.getInstance(
      GetThreadDetailsUseCase.name
    );

    const thread = await getThreadDetails.execute(threadId);

    return {
      status: 'success',
      data: { thread },
    };
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

  async likeOrDislikeComment(req, h) {
    const { id: userId } = req.auth.credentials;
    const { threadId, commentId } = req.params;

    const likeOrDislikeCommentUsecase = this._container.getInstance(
      LikeOrDislikeCommentUsecase.name
    );

    await likeOrDislikeCommentUsecase.execute(threadId, commentId, userId);

    return { status: 'success' };
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

module.exports = ThreadsHandler;
