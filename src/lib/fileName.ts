import path from 'path';

export default function filename(relativePath: string): string {
  return path.basename(relativePath, path.extname(relativePath));
}
