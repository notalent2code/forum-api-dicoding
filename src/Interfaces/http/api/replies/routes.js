const constants = require('../../../../Commons/constants');

const routes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: (req, h) => handler.postReply(req, h),
    options: { auth: constants.strategyName },
  },
  {
    method: 'DELETE',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
    handler: (req, h) => handler.deleteReply(req, h),
    options: { auth: constants.strategyName },
  },
];

module.exports = routes;
