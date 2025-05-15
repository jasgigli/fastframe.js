/**
 * Version management script for FastFrame.js
 *
 * Usage: node scripts/version-packages.js <version>
 * Example: node scripts/version-packages.js 0.2.0
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
  console.error(
    `${colors.red}Error: Please provide a version number${colors.reset}`
  );
  console.error(`Usage: node scripts/version-packages.js <version>`);
  process.exit(1);
}

// Validate version format (semver)
const semverRegex =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
if (!semverRegex.test(newVersion)) {
  console.error(
    `${colors.red}Error: Invalid version format. Please use semantic versioning (e.g., 1.0.0)${colors.reset}`
  );
  process.exit(1);
}

// Get the packages directory
const packagesDir = path.join(__dirname, '../packages');

// Get all packages
const packages = fs.readdirSync(packagesDir).filter(pkg => {
  const pkgPath = path.join(packagesDir, pkg);
  return (
    fs.statSync(pkgPath).isDirectory() &&
    fs.existsSync(path.join(pkgPath, 'package.json'))
  );
});

console.log(
  `${colors.bright}${colors.magenta}Updating FastFrame.js packages to version ${newVersion}...${colors.reset}\n`
);

// Update package versions
packages.forEach(pkg => {
  const pkgJsonPath = path.join(packagesDir, pkg, 'package.json');

  try {
    // Read package.json
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
    const oldVersion = pkgJson.version;

    // Update version
    pkgJson.version = newVersion;

    // Update dependencies on other FastFrame packages
    if (pkgJson.dependencies) {
      Object.keys(pkgJson.dependencies).forEach(dep => {
        if (dep.startsWith('@fastframe/') || dep === 'fastframe-cli') {
          // Replace workspace:* with actual version
          if (pkgJson.dependencies[dep] === 'workspace:*') {
            pkgJson.dependencies[dep] = `^${newVersion}`;
          }
          // Update existing version references
          else if (pkgJson.dependencies[dep].startsWith('^')) {
            pkgJson.dependencies[dep] = `^${newVersion}`;
          }
        }
      });
    }

    // Update devDependencies on other FastFrame packages
    if (pkgJson.devDependencies) {
      Object.keys(pkgJson.devDependencies).forEach(dep => {
        if (dep.startsWith('@fastframe/') || dep === 'fastframe-cli') {
          // Replace workspace:* with actual version
          if (pkgJson.devDependencies[dep] === 'workspace:*') {
            pkgJson.devDependencies[dep] = `^${newVersion}`;
          }
          // Update existing version references
          else if (pkgJson.devDependencies[dep].startsWith('^')) {
            pkgJson.devDependencies[dep] = `^${newVersion}`;
          }
        }
      });
    }

    // Write updated package.json
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2) + '\n');

    console.log(
      `${colors.green}✓ Updated ${colors.cyan}${pkg}${colors.green} from ${oldVersion} to ${newVersion}${colors.reset}`
    );
  } catch (error) {
    console.error(
      `${colors.red}Error updating ${pkg}: ${error.message}${colors.reset}`
    );
  }
});

// Update root package.json
const rootPkgJsonPath = path.join(__dirname, '../package.json');
try {
  const rootPkgJson = JSON.parse(fs.readFileSync(rootPkgJsonPath, 'utf8'));
  rootPkgJson.version = newVersion;
  fs.writeFileSync(
    rootPkgJsonPath,
    JSON.stringify(rootPkgJson, null, 2) + '\n'
  );
  console.log(
    `${colors.green}✓ Updated root package.json to version ${newVersion}${colors.reset}`
  );
} catch (error) {
  console.error(
    `${colors.red}Error updating root package.json: ${error.message}${colors.reset}`
  );
}

console.log(
  `\n${colors.bright}${colors.green}All packages updated to version ${newVersion}!${colors.reset}`
);
