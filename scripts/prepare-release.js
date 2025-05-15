/**
 * Prepare a release of FastFrame.js
 * 
 * Usage: node scripts/prepare-release.js <version>
 * Example: node scripts/prepare-release.js 0.2.0
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

// Get the new version from command line arguments
const newVersion = process.argv[2];
if (!newVersion) {
  console.error(`${colors.red}Error: Please provide a version number${colors.reset}`);
  console.error(`Usage: node scripts/prepare-release.js <version>`);
  process.exit(1);
}

// Validate version format (semver)
const semverRegex = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
if (!semverRegex.test(newVersion)) {
  console.error(`${colors.red}Error: Invalid version format. Please use semantic versioning (e.g., 1.0.0)${colors.reset}`);
  process.exit(1);
}

console.log(`${colors.bright}${colors.magenta}Preparing FastFrame.js release v${newVersion}...${colors.reset}\n`);

// Step 1: Clean the project
console.log(`${colors.cyan}Step 1: Cleaning the project...${colors.reset}`);
try {
  execSync('pnpm clean', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Project cleaned${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}Error cleaning the project: ${error.message}${colors.reset}`);
  process.exit(1);
}

// Step 2: Update version numbers
console.log(`${colors.cyan}Step 2: Updating version numbers...${colors.reset}`);
try {
  execSync(`node scripts/version-packages.js ${newVersion}`, { stdio: 'inherit' });
  console.log(`${colors.green}✓ Version numbers updated${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}Error updating version numbers: ${error.message}${colors.reset}`);
  process.exit(1);
}

// Step 3: Build all packages
console.log(`${colors.cyan}Step 3: Building all packages...${colors.reset}`);
try {
  execSync('pnpm build', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Packages built successfully${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}Error building packages: ${error.message}${colors.reset}`);
  process.exit(1);
}

// Step 4: Run tests
console.log(`${colors.cyan}Step 4: Running tests...${colors.reset}`);
try {
  execSync('pnpm test', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Tests passed${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}Error running tests: ${error.message}${colors.reset}`);
  process.exit(1);
}

// Step 5: Run type checks
console.log(`${colors.cyan}Step 5: Running type checks...${colors.reset}`);
try {
  execSync('pnpm test:types', { stdio: 'inherit' });
  console.log(`${colors.green}✓ Type checks passed${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}Error running type checks: ${error.message}${colors.reset}`);
  process.exit(1);
}

// Step 6: Create git tag
console.log(`${colors.cyan}Step 6: Creating git tag...${colors.reset}`);
try {
  execSync(`git add .`, { stdio: 'inherit' });
  execSync(`git commit -m "chore: release v${newVersion}"`, { stdio: 'inherit' });
  execSync(`git tag -a v${newVersion} -m "v${newVersion}"`, { stdio: 'inherit' });
  console.log(`${colors.green}✓ Git tag created${colors.reset}\n`);
} catch (error) {
  console.error(`${colors.red}Error creating git tag: ${error.message}${colors.reset}`);
  process.exit(1);
}

console.log(`${colors.bright}${colors.green}FastFrame.js v${newVersion} is ready for release!${colors.reset}`);
console.log(`\nTo publish the release, run the following commands:`);
console.log(`\n  ${colors.cyan}git push origin main${colors.reset}`);
console.log(`  ${colors.cyan}git push origin v${newVersion}${colors.reset}`);
console.log(`\nOr use the GitHub Actions workflow by pushing the tag:`);
console.log(`\n  ${colors.cyan}git push origin v${newVersion}${colors.reset}`);
