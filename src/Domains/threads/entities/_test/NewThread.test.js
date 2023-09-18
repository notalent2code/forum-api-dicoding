const NewThread = require('../NewThread');

describe('a NewThread entity', () => {
  it('should throw error when payload did not contain needed property', () => {
    const payload = {
      title: 'example title',
    };

    ion and Assert
    expect(() => new NewThread(payload)).toThrowError(
      'NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY'
    );
  });

  it('should throw error when payload did not meet data type specification', () => {
    const payload = {
      title: 'example title',
      body: 123,
    };

    ion and Assert
    expect(() => new NewThread(payload)).toThrowError(
      'NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION'
    );
  });

  it('should create Thread object correctly', () => {
    const payload = {
      title: 'A thread',
      body: 'A thread body',
    };

    ion
    const newThread = new NewThread(payload);

    
    expect(newThread.title).toStrictEqual(payload.title);
    expect(newThread.body).toStrictEqual(payload.body);
  });
});
