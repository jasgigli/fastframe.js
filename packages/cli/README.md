# fastframe-cli

Command-line interface for FastFrame.js.

## Installation

```bash
npm install -g fastframe-cli
```

## Usage

### Create a new project

```bash
fastframe init my-app
cd my-app
npm install
npm run dev
```

### Development server

```bash
fastframe dev
```

Options:
- `-p, --port <port>`: Port to use (default: 3000)
- `-h, --host <host>`: Host to use (default: localhost)
- `--open`: Open in browser

### Build for production

```bash
fastframe build
```

Options:
- `-o, --outDir <outDir>`: Output directory (default: dist)
- `--analyze`: Analyze bundle size

### Generate code

```bash
fastframe generate component MyComponent
```

Options:
- `-d, --dir <dir>`: Directory to generate in (default: src)

## Commands

### `init [name]`

Initializes a new FastFrame.js project.

Options:
- `-t, --template <template>`: Template to use (default: default)
- `--ts`: Use TypeScript

### `dev`

Starts the development server.

### `build`

Builds the project for production.

### `generate <type> <name>`

Generates a component, page, layout, or store.

Types:
- `component`: Generates a new component
- `page`: Generates a new page
- `layout`: Generates a new layout
- `store`: Generates a new store

## Configuration

FastFrame.js projects can be configured using a `ff.config.js` file:

```js
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
```

## License

MIT
