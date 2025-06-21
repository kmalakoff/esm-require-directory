import type { SettingsCallback } from '../types.ts';

export default function importFile(fullPath: string, callback: SettingsCallback): undefined {
  import(`file://${fullPath}`)
    .then((module) => {
      callback(null, module);
    })
    .catch(callback);
}
