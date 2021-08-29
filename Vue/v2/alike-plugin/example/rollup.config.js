import * as path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve'

const resolve = file => path.resolve(__dirname, file);

export default {
  input: resolve('../index.js'),
  output: {
    file: resolve('sdk.js'),
    format: 'iife',
    name: 'V',
    sourcemap: true,
  },
  plugins: [
    nodeResolve(),
    serve({
      port: 8080
    })
  ]
}
