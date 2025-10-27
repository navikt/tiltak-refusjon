// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
    files: ['**/*.ts', '**/*.tsx'],
    extends:[
        eslint.configs.recommended,
        tseslint.configs.recommended,
    ]
}, storybook.configs["flat/recommended"], storybook.configs["flat/recommended"]);
