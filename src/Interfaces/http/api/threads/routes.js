const constants = require('../../../../Commons/constants');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads',
    handler: (req, h) => handler.postThread(req, h),
    options: { auth: constants.strategyName },
  },
  {
    method: 'GET',
    path: '/threads/{threadId}',
    handler: (req, h) => handler.getThreadDetails(req, h),
  },
];

module.exports = routes;
