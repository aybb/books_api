import fs from 'fs';
import path from 'path';

import { generateToken } from './hash';
import { uploadsPath, apiExternalURL } from '../config';

export default (newImage, prevImage = null) => {
  return new Promise(async (resolve, reject) => {
    if (newImage === prevImage) {
      resolve(prevImage);
      return;
    }
    const imageName = await generateToken(96);
    const base64data = newImage.replace(/^data:image\/(png|gif|jpeg|jpg);base64,/,'');
    fs.writeFile(
      path.join(uploadsPath, `${imageName}.png`), base64data, 'base64', (err) => {
        if (err) {
          reject();
        }
        resolve(`${apiExternalURL}/img/${imageName}.png`);
      }
    );
  });
}