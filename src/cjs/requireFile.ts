import Module from 'module';

const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;
export type Callback = (error?: Error, module?: unknown) => void;

export default function requireFile(fullPath: string, callback: Callback): void {
  try {
    callback(null, _require(fullPath));
  } catch (err) {
    callback(err);
  }
}
