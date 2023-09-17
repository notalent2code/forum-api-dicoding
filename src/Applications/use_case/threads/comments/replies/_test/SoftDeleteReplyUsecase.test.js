const ThreadsRepository = require('../../../../../../Domains/threads/ThreadsRepository');
const ThreadCommentsRepository = require('../../../../../../Domains/threads/comments/ThreadCommentsRepository');
const ThreadCommentRepliesRepository = require('../../../../../../Domains/threads/comments/replies/ThreadCommentRepliesRepository');

const SoftDeleteReplyUseCase = require('../SoftDeleteReplyUseCase');

describe('SoftDeleteReplyUseCase', () => {
  it('should orchestracting the delete reply action correctly', async () => {
    const mockThreadCommentRepliesRepo = new ThreadCommentRepliesRepository();
    const mockThreadCommentsRepo = new ThreadCommentsRepository();
    const mockThreadsRepo = new ThreadsRepository();

    mockThreadCommentRepliesRepo.softDeleteReply = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadCommentsRepo.verifyCommentLocation = jest
      .fn()
      .mockImplementation(() => Promise.resolve());
    mockThreadsRepo.verifyThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve());

    const usecase = new SoftDeleteReplyUseCase({
      threadCommentRepliesRepository: mockThreadCommentRepliesRepo,
      threadCommentsRepository: mockThreadCommentsRepo,
      threadsRepository: mockThreadsRepo,
    });

    await usecase.execute('thread-123', 'comment-123', 'reply-123', 'user-123');

    expect(mockThreadsRepo.verifyThread).toBeCalledWith('thread-123');
    expect(mockThreadCommentsRepo.verifyCommentLocation).toBeCalledWith(
      'comment-123',
      'thread-123'
    );
    expect(mockThreadCommentRepliesRepo.softDeleteReply).toBeCalledWith(
      'reply-123',
      'user-123'
    );
  });
});
