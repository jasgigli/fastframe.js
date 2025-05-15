/**
 * Create a new template for the FastFrame.js CLI
 * 
 * Usage: node scripts/create-template.js <template-name>
 * Example: node scripts/create-template.js typescript-spa
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
const templateName = args[0];

if (!templateName) {
  console.error(`${colors.red}Error: Please provide a template name${colors.reset}`);
  console.error(`Usage: node scripts/create-template.js <template-name>`);
  process.exit(1);
}

// Create the template directory
const templatesDir = path.join(__dirname, '../packages/cli/templates');
const templateDir = path.join(templatesDir, templateName);

if (fs.existsSync(templateDir)) {
  console.error(`${colors.red}Error: Template '${templateName}' already exists${colors.reset}`);
  process.exit(1);
}

// Create the template directory structure
fs.mkdirSync(templateDir);
fs.mkdirSync(path.join(templateDir, 'src'));
fs.mkdirSync(path.join(templateDir, 'src/components'));
fs.mkdirSync(path.join(templateDir, 'public'));

// Create package.json
const packageJson = {
  name: 'fastframe-app',
  version: '0.1.0',
  private: true,
  scripts: {
    dev: 'fastframe dev',
    build: 'fastframe build',
    preview: 'vite preview'
  },
  dependencies: {
    '@fastframe/core': '^0.1.0'
  },
  devDependencies: {
    'fastframe-cli': '^0.1.0'
  }
};

fs.writeFileSync(
  path.join(templateDir, 'package.json'),
  JSON.stringify(packageJson, null, 2) + '\n'
);

// Create ff.config.js
const ffConfig = `/**
 * FastFrame.js configuration
 */
module.exports = {
  // Plugins
  plugins: [],
  
  // Build options
  build: {
    outDir: 'dist',
    minify: true,
    sourcemap: true
  },
  
  // Dev server options
  server: {
    port: 3000,
    open: true
  }
};
`;

fs.writeFileSync(path.join(templateDir, 'ff.config.js'), ffConfig);

// Create index.html
const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FastFrame.js App</title>
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <style>
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
  </style>
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
`;

fs.writeFileSync(path.join(templateDir, 'index.html'), indexHtml);

// Create main.js
const mainJs = `/**
 * FastFrame.js App
 * Main entry point
 */

import { mount } from '@fastframe/core';
import App from './App.ff.js';

// Mount the app to the DOM
const app = document.getElementById('app');
mount(app, App);
`;

fs.writeFileSync(path.join(templateDir, 'src/main.js'), mainJs);

// Create App.ff.js
const appFfJs = `<script>
  import { signal, effect } from '@fastframe/core';
  import Counter from './components/Counter.ff.js';
  
  // Create a reactive signal
  const [title, setTitle] = signal('Welcome to FastFrame.js');
</script>

<template>
  <div class="app">
    <header class="header">
      <img src="/favicon.svg" alt="FastFrame.js Logo" class="logo" />
      <h1>{title()}</h1>
    </header>
    
    <main class="main">
      <Counter initial="0" />
      
      <p class="read-the-docs">
        Click on the FastFrame.js logo to learn more
      </p>
    </main>
  </div>
</template>
`;

fs.writeFileSync(path.join(templateDir, 'src/App.ff.js'), appFfJs);

// Create Counter.ff.js
const counterFfJs = `<script>
  import { signal, effect } from '@fastframe/core';
  
  // Component props
  export let props = {
    initial: 0
  };
  
  // Convert initial value to number
  const initialValue = parseInt(props.initial, 10) || 0;
  
  // Counter state
  const [count, setCount] = signal(initialValue);
  const [doubleCount, setDoubleCount] = signal(initialValue * 2);
  
  // Update double count when count changes
  effect(() => {
    setDoubleCount(count() * 2);
  });
  
  // Increment counter
  function increment() {
    setCount(count() + 1);
  }
  
  // Decrement counter
  function decrement() {
    setCount(count() - 1);
  }
  
  // Reset counter
  function reset() {
    setCount(initialValue);
  }
</script>

<template>
  <div class="counter">
    <div class="display">
      <div class="count">{count()}</div>
      <div class="double-count">Double: {doubleCount()}</div>
    </div>
    
    <div class="controls">
      <button class="decrement" onclick="{decrement}">-</button>
      <button class="reset" onclick="{reset}">Reset</button>
      <button class="increment" onclick="{increment}">+</button>
    </div>
  </div>
</template>
`;

fs.writeFileSync(path.join(templateDir, 'src/components/Counter.ff.js'), counterFfJs);

// Create favicon.svg
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#0074d9" />
  <path d="M30 30 L70 30 L70 40 L50 40 L50 70 L40 70 L40 40 L30 40 Z" fill="white" />
  <path d="M30 50 L40 50 L40 60 L30 60 Z" fill="#ff851b" />
</svg>`;

fs.writeFileSync(path.join(templateDir, 'public/favicon.svg'), faviconSvg);

console.log(`${colors.green}✓ Created template ${colors.cyan}${templateName}${colors.green} at ${colors.cyan}packages/cli/templates/${templateName}${colors.reset}`);
console.log(`\nTo use this template with the CLI:`);
console.log(`  ${colors.cyan}fastframe init my-app --template ${templateName}${colors.reset}`);
