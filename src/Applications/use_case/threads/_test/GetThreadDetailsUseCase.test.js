const ThreadsRepository = require('../../../../Domains/threads/ThreadsRepository');
const Thread = require('../../../../Domains/threads/entities/Thread');

const ThreadCommentsRepository = require('../../../../Domains/threads/comments/ThreadCommentsRepository');
const Comment = require('../../../../Domains/threads/comments/entities/Comment');

const ThreadCommentRepliesRepository = require('../../../../Domains/threads/comments/replies/ThreadCommentRepliesRepository');

const GetThreadDetailsUseCase = require('../GetThreadDetailsUseCase');

describe('GetThreadDetailsUseCase', () => {
  it('should orchestracting the get thread details by thread id action correctly', async () => {
    const mockThread = new Thread({
      id: 'thread-123',
      title: 'a thread',
      body: 'a thread body',
      date: new Date('2023-09-18T03:32:42.000Z'),
      username: 'dicoding',
    });

    const mockComments = [
      new Comment({
        id: 'comment-123',
        username: 'dicoding',
        date: new Date('2023-09-18T03:32:42.000Z'),
        content: 'a comment',
        likeCount: 0,
        isDeleted: false,
      }),
      new Comment({
        id: 'comment-xyz',
        username: 'koseki_biboo',
        date: new Date('2023-09-18T03:32:42.000Z'),
        content: 'a comment',
        likeCount: 0,
        isDeleted: true,
      }),
    ];

    const mockRawReplies = [
      {
        id: 'reply-123',
        username: 'dicoding',
        date: new Date('2023-09-18T03:32:42.000Z'),
        content: 'a reply',
        isDeleted: false,
        commentId: 'comment-123',
      },
      {
        id: 'reply-xyz',
        username: 'dicoding',
        date: new Date('2023-09-18T03:32:42.000Z'),
        content: 'a reply',
        isDeleted: true,
        commentId: 'comment-123',
      },
      {
        id: 'reply-ijk',
        username: 'koseki_biboo',
        date: new Date('2023-09-18T03:32:42.000Z'),
        content: 'a reply',
        isDeleted: false,
        commentId: 'comment-xyz',
      },
      {
        id: 'reply-dummy',
        username: 'dicoding',
        date: new Date('2023-09-18T03:32:42.000Z'),
        content: 'a reply',
        isDeleted: true,
        commentId: 'comment-xyz',
      },
    ];

    // mockRawReplies.forEach((reply) => {
    //   Object.setPrototypeOf(reply, Object.prototype);
    // });

    // console.log('mockRawReplies', mockRawReplies)

    const mockThreadsRepository = new ThreadsRepository();
    const mockThreadCommentsRepository = new ThreadCommentsRepository();
    const mockThreadCommentRepliesRepository =
      new ThreadCommentRepliesRepository();

    mockThreadsRepository.getThreadById = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockThread));
    mockThreadCommentsRepository.getCommentsFromThread = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockComments));
    mockThreadCommentRepliesRepository.getRawRepliesFromComments = jest
      .fn()
      .mockImplementation(() => Promise.resolve(mockRawReplies));

    const usecase = new GetThreadDetailsUseCase({
      threadsRepository: mockThreadsRepository,
      threadCommentsRepository: mockThreadCommentsRepository,
      threadCommentRepliesRepository: mockThreadCommentRepliesRepository,
    });

    const threadDetails = await usecase.execute('thread-123');

    console.log('threadDetails', threadDetails[0]);

    const expectedThreadDetails = {
      id: 'thread-123',
      title: 'a thread',
      body: 'a thread body',
      date: new Date('2023-09-18T03:32:42.000Z'),
      username: 'dicoding',
      comments: [
        {
          id: 'comment-123',
          username: 'dicoding',
          date: new Date('2023-09-18T03:32:42.000Z'),
          content: 'a comment',
          likeCount: 0,
          replies: [
            {
              id: 'reply-123',
              username: 'dicoding',
              date: new Date('2023-09-18T03:32:42.000Z'),
              content: 'a reply',
            },
            {
              id: 'reply-xyz',
              username: 'dicoding',
              date: new Date('2023-09-18T03:32:42.000Z'),
              content: '**balasan telah dihapus**',
            },
          ],
        },
        {
          id: 'comment-xyz',
          username: 'koseki_biboo',
          date: new Date('2023-09-18T03:32:42.000Z'),
          content: '**komentar telah dihapus**',
          likeCount: 0,
          replies: [
            {
              id: 'reply-ijk',
              username: 'koseki_biboo',
              date: new Date('2023-09-18T03:32:42.000Z'),
              content: 'a reply',
            },
            {
              id: 'reply-dummy',
              username: 'dicoding',
              date: new Date('2023-09-18T03:32:42.000Z'),
              content: '**balasan telah dihapus**',
            },
          ],
        },
      ],
    };

    expect(threadDetails).toStrictEqual(expectedThreadDetails);
    expect(mockThreadsRepository.getThreadById).toBeCalledWith('thread-123');
    expect(mockThreadCommentsRepository.getCommentsFromThread).toBeCalledWith(
      'thread-123'
    );
    expect(
      mockThreadCommentRepliesRepository.getRawRepliesFromComments
    ).toBeCalledWith(['comment-123', 'comment-xyz']);
  });
});
