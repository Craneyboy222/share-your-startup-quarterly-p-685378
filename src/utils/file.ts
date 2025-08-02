import fs from 'fs';
import path from 'path';

export const saveFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(filePath), data, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};

export const deleteFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path.resolve(filePath), (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
};
