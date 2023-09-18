const constants = require('../../../../Commons/constants');

const routes = (handler) => [
  {
    method: 'PUT',
    path: '/threads/{threadId}/comments/{commentId}/likes',
    handler: (req, h) => handler.likeOrDislikeComment(req, h),
    options: { auth: constants.strategyName },
  },
];

module.exports = routes;
