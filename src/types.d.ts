declare module '@eslint/compat' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function fixupPluginRules(plugin: any): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function fixupConfigRules(config: any): any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function includeIgnoreFile(path: string): any;
}

declare module 'eslint-plugin-react-hooks';
declare module 'eslint-plugin-unused-imports';
declare module 'eslint-plugin-react';
