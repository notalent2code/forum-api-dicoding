const constants = require('../../../../Commons/constants');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{threadId}/comments',
    handler: (req, h) => handler.postComment(req, h),
    options: { auth: constants.strategyName },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}',
    handler: (req, h) => handler.deleteComment(req, h),
    options: { auth: constants.strategyName },
  },
];

module.exports = routes;
