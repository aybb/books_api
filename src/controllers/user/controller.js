import db from '../../db/models';

import {
  hashPassword,
  verifyPassword,
  generateToken,
} from '../../utils/hash';

export default class UserController {

  static async register(ctx) {
    const {
      request: {
        body: {
          email,
          password,
        },
      },
    } = ctx;
    try {
      await db.user.create({
        email,
        password: hashPassword(password),
        access_token: await generateToken(),
      });
      ctx.status = 201;
    } catch (e) {
      ctx.status = 500;
      ctx.body = {
        error: 'User with this email already exists',
      };
    }
  };

  static async login(ctx) {
     const {
       request: {
         body: {
           email,
           password,
         },
       },
     } = ctx;
     const userObject = await db.user.findOne({ where: { email } });
     if (!userObject) {
       ctx.status = 500;
       ctx.body = {
         error: 'Invalid email',
       };
     }
     if (!verifyPassword(password, userObject.password)) {
       ctx.status = 500;
       ctx.body = {
         error: 'Invalid password',
       };
     }
     ctx.body = {
       access_token: userObject.access_token,
       user_id: userObject.od,
     };
  };
}