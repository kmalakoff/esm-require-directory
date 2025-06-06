import Module from 'module';

const _require = typeof require === 'undefined' ? Module.createRequire(import.meta.url) : require;
export type Callback = (error?: Error, module?: unknown) => undefined;

export default function requireFile(fullPath: string, callback: Callback): undefined {
  try {
    callback(null, _require(fullPath));
  } catch (err) {
    callback(err);
  }
}
