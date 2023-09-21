require('dotenv').config();
const createServer = require('./Infrastructures/http/createServer');
const container = require('./Infrastructures/container');

const bootstrap = async () => {
  const server = await createServer(container);
  await server.start();
  console.log(`Server running at ${server.info.uri}`);
};

bootstrap();
