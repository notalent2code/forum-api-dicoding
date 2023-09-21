const AddThreadsUseCase = require('../../../../Applications/use_case/threads/AddThreadUseCase');
const GetThreadDetailsUseCase = require('../../../../Applications/use_case/threads/GetThreadDetailsUseCase');

class ThreadsHandler {
  constructor(container) {
    this._container = container;
  }

  async postThread(req, h) {
    const { id: userId } = req.auth.credentials;

    const addThreadsUseCase = this._container.getInstance(
      AddThreadsUseCase.name,
    );

    const addedThread = await addThreadsUseCase.execute(req.payload, userId);

    const response = h.response({
      status: 'success',
      data: { addedThread },
    });
    response.code(201);

    return response;
  }

  async getThreadDetails(req, h) {
    const { threadId } = req.params;

    const getThreadDetails = this._container.getInstance(
      GetThreadDetailsUseCase.name,
    );

    const thread = await getThreadDetails.execute(threadId);

    return {
      status: 'success',
      data: { thread },
    };
  }
}

module.exports = ThreadsHandler;
