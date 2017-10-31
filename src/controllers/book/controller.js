import _ from 'lodash';

import db from '../../db/models';
import saveImage from '../../utils/image';


export default class BookController {

  static async create(ctx) {
    const {
      user : { id },
      request: {
        body: {
          title,
          description,
          release_date,
          cover_image = null,
        },
      },
    } = ctx;
    try {
      let image = null;
      if (!_.isNil(cover_image)) {
        image = await saveImage(cover_image);
      }
      ctx.status = 201;
      ctx.body = await db.book.create({
        title,
        description,
        release_date,
        cover_image: image,
        user_id: id,
      });
    } catch (e) {
      ctx.status = 500;
      ctx.body = {
        error: e.message,
      };
    }
  };

  static async update(ctx) {
    const {
      user,
      params: { id },
      request: {
        body: {
          title,
          description,
          release_date,
          cover_image,
        },
      },
    } = ctx;
    const bookObject = await db.book.findById(id);
    if (_.isNil(bookObject)) {
      ctx.status = 500;
      ctx.body = {
        error: 'Book not found',
      };
      return;
    }
    if (!bookObject.canBeEditedBy(user.id)) {
      ctx.status = 500;
      ctx.body = {
        error: 'You don\'t have permission to edit this book',
      };
      return;
    }
    let image = null;
    if (!_.isNil(cover_image)) {
      image = await saveImage(cover_image, bookObject.cover_image);
    }
    await bookObject.update({
      title,
      description,
      release_date,
      cover_image: image,
    });
    ctx.status = 200;
    ctx.body = bookObject;
  };

  static async delete_(ctx) {
    const {
      user,
      params: { id },
    } = ctx;
    const bookObject = await db.book.findById(id);
    if (_.isNil(bookObject)) {
      ctx.status = 500;
      ctx.body = {
        error: 'Book not found',
      };
      return;
    }
    if (!bookObject.canBeEditedBy(user.id)) {
      ctx.status = 500;
      ctx.body = {
        error: 'You don\'t have permission to delete this book',
      };
      return;
    }
    await bookObject.destroy();
    ctx.status = 200;
  };

  static async list(ctx) {
    const {
      request: {
        query: {
          q,
          page = 1,
        },
      },
    } = ctx;
    const queryOptions = {
      ...!_.isNil(q) && {
        where: {
          $or: [
            { title: { $iLike: `%${q}` } },
            { description: { $iLike: `%${q}` } },
          ],
        }
      },
      attributes: ['title', 'user_id'],
      limit: 10,
      offset: (page - 1) * 10,
    };
    ctx.body = await db.book.findAndCountAll(queryOptions);
  };

  static async get(ctx) {
    const {
      params: { id },
    } = ctx;
    const bookObject = await db.book.findById(id);
    if (_.isNil(bookObject)) {
      ctx.status = 500;
      ctx.body = {
        error: 'Book not found',
      };
      return;
    }
    ctx.body = bookObject;
  };
};