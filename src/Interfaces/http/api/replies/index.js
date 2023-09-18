const RepliesHandler = require('./handler');
const routes = require('./routes');

const replies = {
  name: 'replies',
  register: async (server, { container }) => {
    const repliesHandler = new RepliesHandler(container);

    server.route(routes(repliesHandler));
  },
};

module.exports = replies;
