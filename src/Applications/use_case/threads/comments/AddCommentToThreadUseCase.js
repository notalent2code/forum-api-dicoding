const NewComment = require('../../../../Domains/threads/comments/entities/NewComment');

class AddCommentToThreadUseCase {
  constructor({ threadCommentsRepository, threadsRepository }) {
    this._threadCommentsRepository = threadCommentsRepository;
    this._threadsRepository = threadsRepository;
  }

  async execute(threadId, payload, owner) {
    const newComment = new NewComment(payload);

    await this._threadsRepository.verifyThread(threadId);

    return this._threadCommentsRepository.addCommentToThread(
      threadId,
      newComment,
      owner,
    );
  }
}

module.exports = AddCommentToThreadUseCase;
