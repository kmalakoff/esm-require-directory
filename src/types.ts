export type RequireResult = object | unknown[];
export interface RequireOptions {
  default?: boolean;
  paths?: boolean;
  filename?: boolean;
  recursive?: boolean;
  extensions?: string[];
}
export type RequireCallback = (err?: Error, resolved?: RequireResult) => void;
