import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },

  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    plugins: {
      playwright,
    },
    rules: {
      ...playwright.configs.recommended.rules,

      // Fix false positives for POM-style assertions
      'playwright/expect-expect': [
        'warn',
        {
          assertFunctionNames: [
            // Page object assertions
            'expectLoaded',
            'expectNotLoaded',
            'expectCartCount',
            'expectCartBadgeCount',
            'expectItemPresent',
            'expectItemNotPresent',
            'expectTotalsPresent',
            'expectErrorContains',
            'expectProductCardHasContent',

            // Auth / login helpers
            'expectOnLoginPage',
          ],
        },
      ],
    },
  },

  {
    ignores: ['node_modules/', 'dist/', 'playwright-report/', 'test-results/'],
  },
];
