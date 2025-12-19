import type { SettingsCallback } from '../types.ts';

export default function importFile(fullPath: string, callback: SettingsCallback): void {
  import(`file://${fullPath}`)
    .then((module) => {
      callback(null, module);
    })
    .catch(callback);
}
