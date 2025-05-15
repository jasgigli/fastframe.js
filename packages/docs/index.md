---
layout: home
hero:
  name: FastFrame.js
  text: Next-generation frontend framework
  tagline: Compile-time reactivity, zero-config setup, partial hydration, and first-class TypeScript support
  image:
    src: /logo.svg
    alt: FastFrame.js
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: View on GitHub
      link: https://github.com/fastframejs/fastframe

features:
  - icon: 🚀
    title: Compile-time reactivity
    details: Optimized reactive updates without a virtual DOM for maximum performance
  - icon: 🔧
    title: Zero-config setup
    details: Get started quickly with sensible defaults and minimal configuration
  - icon: 🌊
    title: Partial hydration
    details: Load only what you need, when you need it for optimal user experience
  - icon: 📘
    title: First-class TypeScript
    details: Built from the ground up with type safety in mind
---

# Welcome to FastFrame.js

FastFrame.js is a next-generation frontend framework designed for modern web development. It combines the best ideas from existing frameworks with innovative approaches to reactivity, performance, and developer experience.

## Key Features

- **Compile-time reactivity**: FastFrame.js transforms your reactive code at build time, eliminating the need for a virtual DOM and resulting in highly optimized updates.

- **Zero-config setup**: Get started quickly with sensible defaults. FastFrame.js works out of the box with minimal configuration.

- **Partial hydration**: Load only the JavaScript needed for each component, reducing initial load times and improving performance.

- **First-class TypeScript support**: Built from the ground up with TypeScript, providing excellent type safety and developer experience.

## Quick Start

```bash
# Install the CLI
npm install -g fastframe-cli

# Create a new project
fastframe init my-app

# Start the development server
cd my-app
npm run dev
```

## Example Component

```html
<!-- Counter.ff.js -->
<script>
  import { signal } from '@fastframe/core';
  
  // Create a reactive signal
  const [count, setCount] = signal(0);
  
  // Increment counter
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
```
