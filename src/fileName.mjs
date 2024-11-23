import path from 'path';

export default function filename(relativePath) {
  return path.basename(relativePath, path.extname(relativePath));
}
