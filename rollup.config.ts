import {defineConfig} from 'rollup';
import swc from '@rollup/plugin-swc';
import terser from '@rollup/plugin-terser';
import {babel} from '@rollup/plugin-babel';

import {resolve, dirname} from 'node:path'
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    input: resolve(__dirname, './src/index.ts'),
    output: [
        {
            file: 'dist/es/index.js',
            format: 'esm',
        },
        {
            file: 'dist/lib/index.js',
            format: 'umd',
            name: 'DzStorage'
        },
    ],
    plugins: [/*terser(),*/ /*babel({presets: ['@babel/preset-env']}),*/ swc()]
})
