const ThreadCommentsRepository = require('../ThreadCommentsRepository');

describe('ThreadCommentsRepository', () => {
  it('should throw error when invoke unimplemented method', async () => {
    const threadCommentsRepo = new ThreadCommentsRepository();

    await expect(
      threadCommentsRepo.addCommentToThread('', { content: '' }, ''),
    ).rejects.toThrowError('THREAD_COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(
      threadCommentsRepo.verifyCommentAccess('', ''),
    ).rejects.toThrowError('THREAD_COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(
      threadCommentsRepo.softDeleteCommentById(''),
    ).rejects.toThrowError('THREAD_COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(
      threadCommentsRepo.getCommentsFromThread(''),
    ).rejects.toThrowError('THREAD_COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');

    await expect(
      threadCommentsRepo.verifyCommentLocation('', ''),
    ).rejects.toThrowError('THREAD_COMMENTS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  });
});
