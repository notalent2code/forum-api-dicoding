const NewThread = require('../../../Domains/threads/entities/NewThread');

class AddThreadUseCase {
  constructor({ threadsRepository }) {
    this._threadsRepository = threadsRepository;
  }

  async execute(payload, owner) {
    const thread = new NewThread(payload);

    return this._threadsRepository.addThread(thread, owner);
  }
}

module.exports = AddThreadUseCase;
