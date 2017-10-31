import crypto from 'crypto';

import { generate, verify } from 'password-hash';

export const generateToken = (length = 48) => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(length, (err, buffer) => {
      resolve(buffer.toString('hex'));
    });
  })
};

export const hashPassword = plain => generate(plain);

export const verifyPassword = (plain, hashed) => verify(plain, hashed);

