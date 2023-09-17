const AddedReply = require('../AddedReply');

describe('a AddedReply entities', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {};

    expect(() => new AddedReply(payload)).toThrowError(
      'ADDED_COMMENT.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 123,
      content: 'dicoding',
      owner: {},
    };

    expect(() => new AddedReply(payload)).toThrowError(
      'ADDED_COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create AddedReply object correctly', () => {
    const payload = {
      id: 'user-123',
      content: 'dicoding',
      owner: 'user-123',
    };

    const addedReply = new AddedReply(payload);

    expect(addedReply.id).toStrictEqual(payload.id);
    expect(addedReply.content).toStrictEqual(payload.content);
    expect(addedReply.owner).toStrictEqual(payload.owner);
  });
});
