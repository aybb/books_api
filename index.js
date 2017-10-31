import fs from 'fs';

import Koa from 'koa';
import cors from 'koa-cors';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import static_ from 'koa-static-server';

import db from './src/db/models';
import { authMiddleware } from './src/middleware/auth';

const app = new Koa();

db.sequelize.authenticate().then(() => {
  app.use(
    authMiddleware
  ).use(
    convert(cors({ origin: true }))
  ).use(
    convert(bodyParser({ limit: '10mb' }))
  ).use(static_({
    rootPath: '/img',
    rootDir: `${__dirname}/uploads`,
  })).listen(
    1337
  );
  fs.readdirSync(`${__dirname}/src/controllers`).forEach(controller => {
    try {
      app.use(
        require(`${__dirname}/src/controllers/${controller}/router.js`).default
      );
      console.log(`loaded ${controller} controller`);
    } catch (e) {
      console.log(`Error, while loading ${controller}`, e);
    }
  });
  console.log('API IS RUNNING');
});