# FastFrame.js

A next-generation frontend framework with compile-time reactivity, zero-config setup, partial hydration, and first-class TypeScript support.

## Features

- 🚀 **Compile-time reactivity** - Optimized reactive updates without a virtual DOM
- 🔧 **Zero-config setup** - Get started quickly with sensible defaults
- 🌊 **Partial hydration** - Load only what you need, when you need it
- 📘 **First-class TypeScript** - Built from the ground up with type safety

## Packages

- `@fastframe/core` - Runtime and reactivity primitives
- `@fastframe/compiler` - Vite plugin and AST transforms
- `fastframe-cli` - Command-line interface for scaffolding and building
- `create-fastframe` - Create new FastFrame.js projects with one command
- `@fastframe/webpack-loader` - Webpack loader for FastFrame.js
- `@fastframe/rollup-plugin` - Rollup plugin for FastFrame.js

## Installation

### Create a New Project

The easiest way to get started with FastFrame.js is to use the `create-fastframe` package:

```bash
# Using npm
npm create fastframe my-app

# Using yarn
yarn create fastframe my-app

# Using pnpm
pnpm create fastframe my-app
```

### Install CLI Globally

You can also install the CLI globally:

```bash
# Using npm
npm install -g fastframe-cli

# Using yarn
yarn global add fastframe-cli

# Using pnpm
pnpm add -g fastframe-cli
```

Then create a new project:

```bash
fastframe init my-app
```

## Development

```bash
# Navigate to your project
cd my-app

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Building for Production

```bash
# Build the project
npm run build

# Preview the production build
npm run preview
```

## Using with Build Tools

### Vite

FastFrame.js works out of the box with Vite when using the CLI.

### Webpack

```bash
npm install --save-dev @fastframe/webpack-loader
```

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ff\.js$/,
        use: '@fastframe/webpack-loader'
      }
    ]
  }
};
```

### Rollup

```bash
npm install --save-dev @fastframe/rollup-plugin
```

```js
// rollup.config.js
import fastframe from '@fastframe/rollup-plugin';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  plugins: [fastframe()]
};
```

## Documentation

For detailed documentation, visit [fastframejs.org](https://fastframejs.org).

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT
