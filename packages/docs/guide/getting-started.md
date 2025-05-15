# Getting Started

This guide will help you set up your first FastFrame.js project and understand the basics of the framework.

## Prerequisites

Before you begin, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm, yarn, or [pnpm](https://pnpm.io/) (we recommend pnpm)

## Creating a New Project

The easiest way to get started with FastFrame.js is to use the CLI to create a new project:

```bash
# Install the CLI globally
npm install -g fastframe-cli

# Create a new project
fastframe init my-first-app

# Navigate to the project directory
cd my-first-app

# Install dependencies
npm install
```

## Project Structure

A new FastFrame.js project has the following structure:

```
my-first-app/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Counter.ff.js
│   ├── App.ff.js
│   └── main.js
├── index.html
├── ff.config.js
└── package.json
```

- `public/`: Static assets that will be copied to the build directory
- `src/`: Source code for your application
  - `components/`: Reusable components
  - `App.ff.js`: The root component of your application
  - `main.js`: The entry point that mounts your application
- `index.html`: The HTML template for your application
- `ff.config.js`: Configuration for FastFrame.js
- `package.json`: Project dependencies and scripts

## Development Server

To start the development server:

```bash
npm run dev
```

This will start a local development server at `http://localhost:3000` with hot module replacement (HMR) enabled.

## Your First Component

Let's look at the `Counter.ff.js` component that comes with the default template:

```html
<script>
  import { signal, effect } from '@fastframe/core';
  
  // Create a reactive signal
  const [count, setCount] = signal(0);
  
  // Update double count when count changes
  const [doubleCount, setDoubleCount] = signal(0);
  
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
</script>

<template>
  <div class="counter">
    <h2>Counter: {count()}</h2>
    <p>Double: {doubleCount()}</p>
    <div class="buttons">
      <button onclick="{decrement}">-</button>
      <button onclick="{increment}">+</button>
    </div>
  </div>
</template>
```

This component demonstrates several key concepts:

1. **Reactivity**: Using `signal` to create reactive state
2. **Effects**: Using `effect` to react to state changes
3. **Templates**: Declarative UI with reactive expressions

## Building for Production

To build your application for production:

```bash
npm run build
```

This will create a `dist` directory with optimized production files.

To preview the production build locally:

```bash
npm run preview
```

## Next Steps

Now that you have your first FastFrame.js application running, you can:

1. Learn more about [components](/guide/components)
2. Explore the [reactivity system](/guide/reactivity)
3. Understand [templates](/guide/templates)
4. Check out the [API reference](/api/core)

Happy coding with FastFrame.js!
