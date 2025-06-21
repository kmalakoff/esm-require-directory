import path from 'path';
import fileName from './fileName.ts';

export default function filePath(relativePath: string): string {
  return path.join(path.dirname(relativePath), fileName(relativePath));
}
