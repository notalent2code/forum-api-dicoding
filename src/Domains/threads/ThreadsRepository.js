class ThreadsRepository {
  async addThread(newThread, owner) {
    throw new Error('THREADS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async getThreadById(threadId) {
    throw new Error('THREADS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }

  async verifyThread(threadId) {
    throw new Error('THREADS_REPOSITORY.METHOD_NOT_IMPLEMENTED');
  }
}

module.exports = ThreadsRepository;
