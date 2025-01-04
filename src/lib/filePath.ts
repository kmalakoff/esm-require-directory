import path from 'path';
import fileName from './fileName';

export default function filePath(relativePath) {
  return path.join(path.dirname(relativePath), fileName(relativePath));
}
