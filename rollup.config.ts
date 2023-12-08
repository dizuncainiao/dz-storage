import {defineConfig} from 'rollup';
import swc from '@rollup/plugin-swc';
import terser from '@rollup/plugin-terser';
import buble from '@rollup/plugin-buble';
import {dts} from "rollup-plugin-dts";
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig([
    {
        input: resolve(__dirname, './src/index.ts'),
        output: [
            {
                file: 'dist/es/index.esm.js',
                format: 'esm',
            },
            {
                file: 'dist/lib/index.umd.js',
                format: 'umd',
                name: 'DzStorage'
            },
        ],
        plugins: [swc(), buble({exclude: 'node_modules/**'}), terser()]
    },
    {
        input: resolve(__dirname, './src/index.ts'),
        plugins: [dts()],
        output: [
            {
                file: 'dist/index.d.ts',
                format: 'esm',
            },
        ]
    }
])
