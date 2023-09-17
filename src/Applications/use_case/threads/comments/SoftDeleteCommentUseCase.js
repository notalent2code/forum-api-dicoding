class SoftDeleteCommentUseCase {
  constructor({ threadCommentsRepository, threadsRepository }) {
    this._threadCommentsRepository = threadCommentsRepository;
    this._threadsRepository = threadsRepository;
  }

  async execute(threadId, commentId, userId) {
    await this._threadsRepository.verifyThread(threadId);

    await this._threadCommentsRepository.softDeleteCommentById(
      commentId,
      userId
    );
  }
}

module.exports = SoftDeleteCommentUseCase;
