const LikesHandler = require('./handler');
const routes = require('./routes');

const likes = {
  name: 'likes',
  register: async (server, { container }) => {
    const likesHandler = new LikesHandler(container);

    server.route(routes(likesHandler));
  },
};

module.exports = likes;
