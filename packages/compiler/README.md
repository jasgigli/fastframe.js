# @fastframe/compiler

Compiler and Vite plugin for FastFrame.js.

## Installation

```bash
npm install @fastframe/compiler
```

## Usage

### Vite Configuration

```js
// vite.config.js
import { defineConfig } from 'vite';
import { fastframePlugin } from '@fastframe/compiler';

export default defineConfig({
  plugins: [
    fastframePlugin({
      // Plugin options
      plugins: [],
      dev: true
    })
  ]
});
```

### FastFrame Component

```html
<!-- App.ff.js -->
<script>
  import { signal } from '@fastframe/core';
  
  const [count, setCount] = signal(0);
  
  function increment() {
    setCount(count() + 1);
  }
</script>

<template>
  <div>
    <h1>Count: {count()}</h1>
    <button onclick="{increment}">Increment</button>
  </div>
</template>

<style>
  h1 {
    color: blue;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #0074d9;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
</style>
```

## API Reference

### `fastframePlugin(options?: FastframePluginOptions): Plugin`

Creates a Vite plugin that processes `.ff.js` files.

#### Options

- `plugins`: Array of custom plugins to extend the compiler
- `dev`: Boolean indicating development mode
- `hooks`: Object containing compiler hooks
  - `beforeTransform`: Function called before transforming a file
  - `afterTransform`: Function called after transforming a file

### `transform(source: string, id: string, options?: FastframePluginOptions): Promise<TransformResult>`

Transforms a FastFrame component into JavaScript.

## Plugin System

You can extend the compiler with custom plugins:

```js
// my-plugin.js
export default {
  name: 'my-plugin',
  transform(code, id) {
    // Transform the code
    return code;
  }
};

// vite.config.js
import { defineConfig } from 'vite';
import { fastframePlugin } from '@fastframe/compiler';
import myPlugin from './my-plugin';

export default defineConfig({
  plugins: [
    fastframePlugin({
      plugins: [myPlugin]
    })
  ]
});
```

## License

MIT
