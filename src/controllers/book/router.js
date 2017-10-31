import Router from 'koa-router';

import BookController from './controller';
import { requiresAuth } from '../../middleware/auth';

const router = new Router({ prefix: '/books' });

router.post('/create', requiresAuth, BookController.create);
router.put('/update/:id', requiresAuth, BookController.update);
router.del('/delete/:id', requiresAuth, BookController.delete_);
router.get('/', requiresAuth, BookController.list);
router.get('/:id', requiresAuth, BookController.get);

export default router.routes();