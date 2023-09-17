const UsersHandler = require('./handler');
const routes = require('./routes');

const users = {
  name: 'users',
  register: async (server, { container }) => {
    const usersHandler = new UsersHandler(container);
    server.route(routes(usersHandler));
  },
};

module.exports = users;
