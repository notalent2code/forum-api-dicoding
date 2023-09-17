const ThreadsHandler = require('./handler');
const routes = require('./routes');

const threads = {
  name: 'threads',
  register: async (server, { container }) => {
    const threadsHandler = new ThreadsHandler(container);

    server.route(routes(threadsHandler));
  },
};

module.exports = threads;
