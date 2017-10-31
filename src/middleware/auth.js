import _ from 'lodash';

import db from '../db/models/index';

export const requiresAuth = async (ctx, next) => {
  const { user } = ctx;
  if (_.isNil(user)) {
    ctx.throw(401);
  } else {
    return next();
  }
};

export const authMiddleware = async (ctx, next) => {
  const { request: { header: { authorization } } } = ctx;
  if (authorization) {
    try {
      const access_token = authorization.split(' ')[1];
      const user = await db.user.findOne({ where: { access_token } });
      if (!_.isNil(user)) {
        ctx.user = user;
      } else {
        ctx.user = null;
      }
    } catch (e) {
      ctx.user = null;
    }
  } else {
    ctx.user = null;
  }
  await next();
};