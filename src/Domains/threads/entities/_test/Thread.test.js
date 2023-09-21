const Thread = require('../Thread');

describe('a Thread entity', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      title: 'example title',
    };

    expect(() => new Thread(payload)).toThrowError(
      'THREAD.NOT_CONTAIN_NEEDED_PROPERTY',
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      id: 'thread-123',
      title: 'example title',
      body: 'example body',
      date: Date.now(),
      username: 'koseki_biboo',
    };

    expect(() => new Thread(payload)).toThrowError(
      'THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION',
    );
  });

  it('should create Thread object correctly', () => {
    const payload = {
      id: 'thread-123',
      title: 'example title',
      body: 'example body',
      date: new Date(),
      username: 'koseki_biboo',
    };

    const thread = new Thread(payload);

    expect(thread.id).toStrictEqual(payload.id);
    expect(thread.title).toStrictEqual(payload.title);
    expect(thread.body).toStrictEqual(payload.body);
    expect(thread.date).toStrictEqual(payload.date);
    expect(thread.username).toStrictEqual(payload.username);
  });
});
