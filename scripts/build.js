import * as esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 确保 bundle 目录存在
const bundleDir = path.join(rootDir, 'bundle');
if (!fs.existsSync(bundleDir)) {
  fs.mkdirSync(bundleDir);
}

// 插件：处理 react-devtools-core，防止找不到模块
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
      // === 新增：将字体库设为外部依赖，解决字体找不到的问题 ===
      'ink-big-text', 
      'cfonts' 
    ],
    // === 修复：Shebang 必须在第一行 ===
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
