/**
 * Build script for FastFrame.js
 * Builds all packages in the correct order
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colors for console output
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

// Package build order
const packages = [
  'core',
  'compiler',
  'cli',
  'webpack-loader',
  'rollup-plugin',
  'create-fastframe',
  'docs',
  'example'
];

// Build a package
function buildPackage(packageName) {
  const packagePath = path.join(__dirname, 'packages', packageName);

  // Check if package exists
  if (!fs.existsSync(packagePath)) {
    console.error(
      `${colors.red}Package ${packageName} not found${colors.reset}`
    );
    return false;
  }

  console.log(
    `\n${colors.bright}${colors.cyan}Building ${packageName}...${colors.reset}\n`
  );

  try {
    // Run build script
    execSync('pnpm run build', {
      cwd: packagePath,
      stdio: 'inherit'
    });

    console.log(`${colors.green}✓ Built ${packageName}${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}Failed to build ${packageName}${colors.reset}`);
    console.error(error);
    return false;
  }
}

// Build all packages
async function buildAll() {
  console.log(
    `${colors.bright}${colors.magenta}Building FastFrame.js packages...${colors.reset}\n`
  );

  let success = true;

  for (const packageName of packages) {
    const result = buildPackage(packageName);
    if (!result) {
      success = false;
      break;
    }
  }

  if (success) {
    console.log(
      `\n${colors.bright}${colors.green}All packages built successfully!${colors.reset}`
    );
  } else {
    console.error(`\n${colors.bright}${colors.red}Build failed${colors.reset}`);
    process.exit(1);
  }
}

// Run the build
buildAll();
