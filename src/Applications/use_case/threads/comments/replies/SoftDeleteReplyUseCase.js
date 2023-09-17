class SoftDeleteReplyUseCase {
  constructor({
    threadCommentRepliesRepository,
    threadCommentsRepository,
    threadsRepository,
  }) {
    this._threadCommentRepliesRepository = threadCommentRepliesRepository;
    this._threadCommentsRepository = threadCommentsRepository;
    this._threadsRepository = threadsRepository;
  }

  async execute(threadId, commentId, replyId, userId) {
    await this._threadsRepository.verifyThread(threadId);
    await this._threadCommentsRepository.verifyCommentLocation(
      commentId,
      threadId
    );

    await this._threadCommentRepliesRepository.softDeleteReply(replyId, userId);
  }
}

module.exports = SoftDeleteReplyUseCase;
