import * as esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const bundleDir = path.join(rootDir, 'bundle');
if (!fs.existsSync(bundleDir)) {
  fs.mkdirSync(bundleDir);
}

const ignorePlugin = {
  name: 'ignore-plugin',
  setup(build) {
    build.onResolve({ filter: /^react-devtools-core$/ }, args => ({
      path: args.path,
      namespace: 'ignore-me',
    }));
    build.onLoad({ filter: /.*/, namespace: 'ignore-me' }, () => ({
      contents: 'export default {}',
    }));
  },
};

console.log('Building MTMC CLI...');

try {
  await esbuild.build({
    entryPoints: [path.join(rootDir, 'packages/cli/index.tsx')],
    bundle: true,
    platform: 'node',
    format: 'esm',
    outfile: path.join(bundleDir, 'mtmc.js'),
    plugins: [ignorePlugin],
    external: [
      'fsevents',
      'node-pty',
      'yoga-wasm-web',
      'ink-big-text', 
      'cfonts' 
    ],
    banner: {
      js: `#!/usr/bin/env node
import { createRequire } from 'module';
const require = createRequire(import.meta.url);`,
    },
    loader: {
      '.js': 'jsx',
      '.tsx': 'tsx',
    },
  });
  console.log('✅ Build success! Run: npm start');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}
