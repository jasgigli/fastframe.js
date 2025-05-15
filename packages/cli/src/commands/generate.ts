/**
 * Generate command
 * Generates components, pages, and other code
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';

interface GenerateOptions {
  dir: string;
}

export async function generateCommand(type: string, name: string, options: GenerateOptions): Promise<void> {
  const spinner = ora(`Generating ${type}...`).start();
  
  try {
    // Validate type
    const validTypes = ['component', 'page', 'layout', 'store'];
    if (!validTypes.includes(type)) {
      spinner.fail(`Invalid type: ${chalk.red(type)}`);
      console.log(`Valid types: ${validTypes.map(t => chalk.cyan(t)).join(', ')}`);
      return;
    }
    
    // Create directory if it doesn't exist
    const dir = path.resolve(process.cwd(), options.dir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Generate code based on type
    switch (type) {
      case 'component':
        await generateComponent(name, dir);
        break;
      case 'page':
        await generatePage(name, dir);
        break;
      case 'layout':
        await generateLayout(name, dir);
        break;
      case 'store':
        await generateStore(name, dir);
        break;
    }
    
    spinner.succeed(`Generated ${type}: ${chalk.cyan(name)}`);
    
  } catch (error) {
    spinner.fail(`Failed to generate ${type}`);
    console.error(error);
  }
}

/**
 * Generate a component
 */
async function generateComponent(name: string, dir: string): Promise<void> {
  const componentDir = path.join(dir, name);
  fs.mkdirSync(componentDir, { recursive: true });
  
  const componentCode = `<script>
  import { signal, effect } from '@fastframe/core';
  
  // Component props
  export let props = {};
  
  // Component state
  const [count, setCount] = signal(0);
  
  // Methods
  function increment() {
    setCount(count() + 1);
  }
</script>

<template>
  <div class="${name}">
    <h2>{props.title || '${name}'}</h2>
    <p>Count: {count()}</p>
    <button onclick="{increment}">Increment</button>
  </div>
</template>

<style>
  .${name} {
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>`;
  
  fs.writeFileSync(path.join(componentDir, 'index.ff.js'), componentCode);
}

/**
 * Generate a page
 */
async function generatePage(name: string, dir: string): Promise<void> {
  const pageDir = path.join(dir, 'pages', name);
  fs.mkdirSync(pageDir, { recursive: true });
  
  const pageCode = `<script>
  import { signal, effect } from '@fastframe/core';
  
  // Page title
  document.title = '${name} Page';
  
  // Page state
  const [loading, setLoading] = signal(true);
  
  // Load data
  effect(async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  });
</script>

<template>
  <div class="page">
    <h1>${name} Page</h1>
    
    {loading() ? (
      <div class="loading">Loading...</div>
    ) : (
      <div class="content">
        <p>Page content goes here</p>
      </div>
    )}
  </div>
</template>

<style>
  .page {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }
  
  .loading {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
</style>`;
  
  fs.writeFileSync(path.join(pageDir, 'index.ff.js'), pageCode);
}

/**
 * Generate a layout
 */
async function generateLayout(name: string, dir: string): Promise<void> {
  const layoutDir = path.join(dir, 'layouts');
  fs.mkdirSync(layoutDir, { recursive: true });
  
  const layoutCode = `<script>
  // Layout props
  export let props = {};
</script>

<template>
  <div class="layout ${name}">
    <header class="header">
      <h1>{props.title || 'FastFrame.js'}</h1>
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </nav>
    </header>
    
    <main class="content">
      <slot></slot>
    </main>
    
    <footer class="footer">
      <p>&copy; {new Date().getFullYear()} FastFrame.js</p>
    </footer>
  </div>
</template>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .header {
    padding: 1rem;
    background-color: #f5f5f5;
    border-bottom: 1px solid #eee;
  }
  
  .header nav ul {
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .header nav li {
    margin-right: 1rem;
  }
  
  .content {
    flex: 1;
    padding: 1rem;
  }
  
  .footer {
    padding: 1rem;
    background-color: #f5f5f5;
    border-top: 1px solid #eee;
    text-align: center;
  }
</style>`;
  
  fs.writeFileSync(path.join(layoutDir, `${name}.ff.js`), layoutCode);
}

/**
 * Generate a store
 */
async function generateStore(name: string, dir: string): Promise<void> {
  const storeDir = path.join(dir, 'stores');
  fs.mkdirSync(storeDir, { recursive: true });
  
  const storeCode = `import { signal, computed } from '@fastframe/core';

// State
const [state, setState] = signal({
  items: [],
  loading: false,
  error: null
});

// Getters
export const items = () => state().items;
export const loading = () => state().loading;
export const error = () => state().error;
export const itemCount = computed(() => state().items.length);

// Actions
export async function fetchItems() {
  // Set loading state
  setState({ ...state(), loading: true, error: null });
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update state with fetched items
    setState({
      ...state(),
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ],
      loading: false
    });
  } catch (error) {
    // Handle error
    setState({
      ...state(),
      loading: false,
      error: error.message || 'Failed to fetch items'
    });
  }
}

export function addItem(item) {
  setState({
    ...state(),
    items: [...state().items, item]
  });
}

export function removeItem(id) {
  setState({
    ...state(),
    items: state().items.filter(item => item.id !== id)
  });
}`;
  
  fs.writeFileSync(path.join(storeDir, `${name}.js`), storeCode);
}
