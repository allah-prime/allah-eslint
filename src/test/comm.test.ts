import { describe, it, expect } from 'vitest';
import { Linter } from 'eslint';
import config from '../index.js';

const linter = new Linter({ configType: 'flat' });


describe('ESLint Rules Integration Tests', () => {
  it('should report error for camelcase violation', () => {
    const code = 'const my_variable = 1;';
    const messages = linter.verify(code, config, { filename: 'test.ts' });
    const error = messages.find((m) => m.ruleId === 'camelcase');
    expect(error).toBeDefined();
    expect(error?.severity).toBe(2); // 2 = error
    expect(error?.message).toContain('Camelcase');
  });

  it('should report error for unused imports', () => {
    const code = `
      import { useState } from 'react';
      const x = 1;
    `;
    const messages = linter.verify(code, config, { filename: 'test.tsx' });
    // Note: unused-imports plugin might report as 'unused-imports/no-unused-imports' or similar
    // Also 'no-unused-vars' might trigger.
    const unusedImportError = messages.find((m) => m.ruleId === 'unused-imports/no-unused-imports');
    expect(unusedImportError).toBeDefined();
    expect(unusedImportError?.severity).toBe(2);
  });

  it('should warn for any type in regular TS files', () => {
    const code = 'const x: any = 1;';
    const messages = linter.verify(code, config, { filename: 'regular.ts' });
    const anyError = messages.find((m) => m.ruleId === '@typescript-eslint/no-explicit-any');
    expect(anyError).toBeDefined();
    expect(anyError?.severity).toBe(1); // 1 = warn (as per tsRule)
  });

  it('should error for any type in Service files (override)', () => {
    const code = 'const x: any = 1;';
    const messages = linter.verify(code, config, { filename: 'src/userService.ts' });
    const anyError = messages.find((m) => m.ruleId === '@typescript-eslint/no-explicit-any');
    expect(anyError).toBeDefined();
    expect(anyError?.severity).toBe(2); // 2 = error (as per overridesRule)
  });

  it('should error for missing return type in Service files', () => {
    const code = 'export const getUser = () => { return 1; };';
    const messages = linter.verify(code, config, { filename: 'src/userService.ts' });
    const returnTypeError = messages.find(
      (m) => m.ruleId === '@typescript-eslint/explicit-function-return-type'
    );
    expect(returnTypeError).toBeDefined();
  });

  it('should not error for camelcase in Enum files', () => {
    const code = 'export enum My_Enum { A = 1 }';
    const messages = linter.verify(code, config, { filename: 'src/types/myEnum.ts' });
    const camelcaseError = messages.find((m) => m.ruleId === 'camelcase');
    expect(camelcaseError).toBeUndefined();
  });

  it('should enforce consistent spacing in objects', () => {
    const code = 'const obj = {key:1};'; // Missing spaces
    const messages = linter.verify(code, config, { filename: 'test.ts' });
    const spacingError = messages.find((m) => m.ruleId === 'object-curly-spacing');
    expect(spacingError).toBeDefined();
    expect(spacingError?.fix).toBeDefined();
  });
});
