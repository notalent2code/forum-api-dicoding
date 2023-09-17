class Reply {
  constructor(args) {
    this._verifyArgs(args);

    this.id = args.id;
    this.username = args.username;
    this.date = args.date;
    this.content = args.isDeleted ? '**balasan telah dihapus**' : args.content;
  }

  _verifyArgs({ id, username, date, content, isDeleted }) {
    if (
      !id ||
      !username ||
      !date ||
      !content ||
      typeof isDeleted === 'undefined'
    ) {
      throw new Error('COMMENT.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (
      typeof id !== 'string' ||
      typeof username !== 'string' ||
      !(date instanceof Date) ||
      typeof content !== 'string' ||
      typeof isDeleted !== 'boolean'
    ) {
      throw new Error('COMMENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = Reply;
