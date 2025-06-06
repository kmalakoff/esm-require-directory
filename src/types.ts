export interface Module {
  default?: unknown;
}

export interface RequireEntry {
  basename: string;
  path: string;
}

export type RequireResult = object | unknown[];
export interface RequireOptions {
  default?: boolean;
  paths?: boolean;
  filename?: boolean;
  recursive?: boolean;
  extensions?: string[];
}
export type RequireCallback = (err?: Error, resolved?: RequireResult) => void;

export type SettingsCallback = (err?: Error, resolved?: unknown) => void;
export interface RequireSettings {
  extensions?: string[];
  loader: (fullPath: string, callback: SettingsCallback) => void;
}

export interface RequireOptionsInternal extends RequireOptions, RequireSettings {}
