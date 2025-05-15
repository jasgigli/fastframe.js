/**
 * Init command
 * Initializes a new FastFrame.js project
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';

interface InitOptions {
  template: string;
  ts: boolean;
}

export async function initCommand(name: string = 'fastframe-app', options: InitOptions): Promise<void> {
  const spinner = ora('Creating FastFrame.js project...').start();
  
  try {
    // Create project directory
    const projectDir = path.resolve(process.cwd(), name);
    
    // Check if directory exists
    if (fs.existsSync(projectDir)) {
      spinner.fail(`Directory ${chalk.cyan(name)} already exists.`);
      return;
    }
    
    // Create directory
    fs.mkdirSync(projectDir, { recursive: true });
    
    // Copy template files
    const templateDir = path.resolve(__dirname, '../../templates', options.template);
    
    // Check if template exists
    if (!fs.existsSync(templateDir)) {
      spinner.fail(`Template ${chalk.cyan(options.template)} not found.`);
      return;
    }
    
    // Copy template files
    fs.copySync(templateDir, projectDir);
    
    // Create package.json
    const packageJson = {
      name,
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
        'fastframe-cli': '^0.1.0',
        'typescript': options.ts ? '^5.0.4' : undefined
      }
    };
    
    // Write package.json
    fs.writeFileSync(
      path.join(projectDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
    
    // Create ff.config.js
    const ffConfig = `module.exports = {
  plugins: [],
  // Add your FastFrame.js configuration here
};`;
    
    fs.writeFileSync(path.join(projectDir, 'ff.config.js'), ffConfig);
    
    // Create src directory
    fs.mkdirSync(path.join(projectDir, 'src'));
    
    // Create index.ff.js
    const indexFile = `<script>
  import { signal, effect } from '@fastframe/core';
  
  // Create a reactive signal
  const [count, setCount] = signal(0);
  
  // Log changes to the count
  effect(() => {
    console.log('Count changed:', count());
  });
  
  // Increment the count
  function increment() {
    setCount(count() + 1);
  }
</script>

<template>
  <div class="app">
    <h1>FastFrame.js</h1>
    <p>Count: {count()}</p>
    <button onclick="{increment}">Increment</button>
  </div>
</template>

<style>
  .app {
    font-family: Arial, sans-serif;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #0074d9;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
</style>`;
    
    fs.writeFileSync(path.join(projectDir, 'src', 'index.ff.js'), indexFile);
    
    // Success message
    spinner.succeed(`Created FastFrame.js project at ${chalk.cyan(projectDir)}`);
    console.log('\nNext steps:');
    console.log(`  ${chalk.cyan('cd')} ${name}`);
    console.log(`  ${chalk.cyan('npm install')} (or ${chalk.cyan('yarn')} or ${chalk.cyan('pnpm install')})`);
    console.log(`  ${chalk.cyan('npm run dev')} (or ${chalk.cyan('yarn dev')} or ${chalk.cyan('pnpm dev')})`);
    
  } catch (error) {
    spinner.fail('Failed to create project');
    console.error(error);
  }
}
