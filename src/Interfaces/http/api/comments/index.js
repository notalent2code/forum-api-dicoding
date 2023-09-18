const CommentsHandler = require('./handler');
const routes = require('./routes');

const comments = {
  name: 'comments',
  register: async (server, { container }) => {
    const commentsHandler = new CommentsHandler(container);

    server.route(routes(commentsHandler));
  },
};

module.exports = comments;
