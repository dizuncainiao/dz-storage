import { defineConfig } from 'rollup'
import swc from '@rollup/plugin-swc'
import terser from '@rollup/plugin-terser'
import { dts } from 'rollup-plugin-dts'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import commonjs from '@rollup/plugin-commonjs'
import nodeResolve from '@rollup/plugin-node-resolve'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig([
  {
    input: resolve(__dirname, './src/index.ts'),
    output: [
      {
        file: 'dist/es/index.esm.js',
        format: 'esm'
      },
      {
        file: 'dist/lib/index.umd.js',
        format: 'umd',
        name: 'DzStorage'
      }
    ],
    plugins: [
      nodeResolve(),
      commonjs(),
      swc(),
      terser()
    ]
  },
  {
    input: resolve(__dirname, './src/index.ts'),
    plugins: [dts()],
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'esm'
      }
    ]
  }
])
