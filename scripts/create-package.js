/**
 * Create a new package in the FastFrame.js monorepo
 * 
 * Usage: node scripts/create-package.js <package-name> [--scope=@fastframe]
 * Example: node scripts/create-package.js router
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ANSI colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

// Parse command line arguments
const args = process.argv.slice(2);
const packageName = args[0];
const scopeArg = args.find(arg => arg.startsWith('--scope='));
const scope = scopeArg ? scopeArg.split('=')[1] : '@fastframe';

if (!packageName) {
  console.error(`${colors.red}Error: Please provide a package name${colors.reset}`);
  console.error(`Usage: node scripts/create-package.js <package-name> [--scope=@fastframe]`);
  process.exit(1);
}

// Get the root package.json to get the current version
const rootPkgJsonPath = path.join(__dirname, '../package.json');
const rootPkgJson = JSON.parse(fs.readFileSync(rootPkgJsonPath, 'utf8'));
const version = rootPkgJson.version;

// Create the package directory
const packagesDir = path.join(__dirname, '../packages');
const packageDir = path.join(packagesDir, packageName);

if (fs.existsSync(packageDir)) {
  console.error(`${colors.red}Error: Package '${packageName}' already exists${colors.reset}`);
  process.exit(1);
}

// Create the package directory
fs.mkdirSync(packageDir);
fs.mkdirSync(path.join(packageDir, 'src'));

// Create package.json
const scopedName = scope ? `${scope}/${packageName}` : packageName;
const packageJson = {
  name: scopedName,
  version,
  description: `${packageName} package for FastFrame.js`,
  main: 'dist/index.js',
  module: 'dist/index.mjs',
  types: 'dist/index.d.ts',
  exports: {
    '.': {
      import: './dist/index.mjs',
      require: './dist/index.js',
      types: './dist/index.d.ts'
    }
  },
  files: [
    'dist'
  ],
  sideEffects: false,
  scripts: {
    build: 'tsup src/index.ts --format cjs,esm --dts --sourcemap',
    dev: 'tsup src/index.ts --format cjs,esm --dts --watch',
    test: 'vitest run',
    'test:watch': 'vitest',
    'test:types': 'tsc --noEmit --skipLibCheck'
  },
  keywords: [
    'fastframe',
    packageName,
    'frontend',
    'framework'
  ],
  author: 'FastFrame Team',
  license: 'MIT',
  dependencies: {},
  devDependencies: {
    tsup: '^6.7.0',
    typescript: '^5.0.4',
    vitest: '^0.30.1'
  },
  repository: {
    type: 'git',
    url: 'https://github.com/fastframejs/fastframe.git',
    directory: `packages/${packageName}`
  },
  homepage: 'https://fastframejs.org',
  bugs: {
    url: 'https://github.com/fastframejs/fastframe/issues'
  },
  publishConfig: {
    access: 'public'
  }
};

// Add dependency on core if it's not the core package
if (packageName !== 'core') {
  packageJson.dependencies['@fastframe/core'] = 'workspace:*';
}

// Write package.json
fs.writeFileSync(
  path.join(packageDir, 'package.json'),
  JSON.stringify(packageJson, null, 2) + '\n'
);

// Create tsconfig.json
const tsconfig = {
  extends: '../../tsconfig.json',
  compilerOptions: {
    outDir: 'dist',
    rootDir: 'src',
    noEmit: false
  },
  include: ['src/**/*']
};

fs.writeFileSync(
  path.join(packageDir, 'tsconfig.json'),
  JSON.stringify(tsconfig, null, 2) + '\n'
);

// Create README.md
const readme = `# ${scopedName}

${packageName} package for FastFrame.js.

## Installation

\`\`\`bash
npm install ${scopedName}
\`\`\`

## Usage

\`\`\`js
import { ... } from '${scopedName}';

// Your code here
\`\`\`

## API

...

## License

MIT
`;

fs.writeFileSync(path.join(packageDir, 'README.md'), readme);

// Create index.ts
const indexTs = `/**
 * ${scopedName}
 * ${packageName} package for FastFrame.js
 */

export function hello() {
  return 'Hello from ${scopedName}';
}
`;

fs.writeFileSync(path.join(packageDir, 'src/index.ts'), indexTs);

console.log(`${colors.green}✓ Created package ${colors.cyan}${scopedName}${colors.green} at ${colors.cyan}packages/${packageName}${colors.reset}`);
console.log(`\nNext steps:`);
console.log(`  1. ${colors.cyan}cd packages/${packageName}${colors.reset}`);
console.log(`  2. ${colors.cyan}pnpm install${colors.reset}`);
console.log(`  3. ${colors.cyan}pnpm dev${colors.reset}`);
console.log(`  4. Start developing your package!`);
