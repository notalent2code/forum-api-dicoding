const NewReply = require('../../../../../Domains/threads/comments/replies/entities/NewReply');

class AddReplyToCommentUseCase {
  constructor({
    threadCommentRepliesRepository,
    threadCommentsRepository,
    threadsRepository,
  }) {
    this._threadCommentRepliesRepository = threadCommentRepliesRepository;
    this._threadCommentsRepository = threadCommentsRepository;
    this._threadsRepository = threadsRepository;
  }

  async execute(threadId, commentId, payload, owner) {
    const newReply = new NewReply(payload);

    await this._threadsRepository.verifyThread(threadId);
    await this._threadCommentsRepository.verifyCommentLocation(
      commentId,
      threadId,
    );

    return this._threadCommentRepliesRepository.addReplyToComment(
      commentId,
      newReply,
      owner,
    );
  }
}

module.exports = AddReplyToCommentUseCase;
