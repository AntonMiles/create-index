import fs from 'fs';
import path from 'path';

export default (directoryPath) => {
  const indexPath = path.resolve(directoryPath, 'index.ts');

  try {
    fs.statSync(indexPath);

    return true;
  } catch (error) {
    return false;
  }
};
