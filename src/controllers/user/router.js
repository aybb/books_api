import Router from 'koa-router';

import UserController from './controller';

const router = new Router({ prefix: '/users' });

router.post('/register', UserController.register);
router.post('/login', UserController.login);

export default router.routes();