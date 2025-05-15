# @fastframe/rollup-plugin

Rollup plugin for FastFrame.js.

## Installation

```bash
npm install @fastframe/rollup-plugin
```

## Usage

### rollup.config.js

```js
import fastframe from '@fastframe/rollup-plugin';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  plugins: [
    fastframe()
  ]
};
```

### With options

```js
import fastframe from '@fastframe/rollup-plugin';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm'
  },
  plugins: [
    fastframe({
      // Plugin options
      include: /\.ff\.js$/,
      exclude: 'node_modules/**',
      jsxFactory: 'h',
      jsxFragment: 'Fragment',
      dev: process.env.NODE_ENV !== 'production'
    })
  ]
};
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `include` | `string \| RegExp \| (string \| RegExp)[]` | `/\.ff\.js$/` | Files to include |
| `exclude` | `string \| RegExp \| (string \| RegExp)[]` | `undefined` | Files to exclude |
| `jsxFactory` | `string` | `'h'` | JSX factory function name |
| `jsxFragment` | `string` | `'Fragment'` | JSX fragment component name |
| `dev` | `boolean` | `process.env.NODE_ENV !== 'production'` | Enable development mode |

## Example

```js
// rollup.config.js
import fastframe from '@fastframe/rollup-plugin';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true
  },
  plugins: [
    fastframe(),
    resolve(),
    commonjs()
  ]
};
```

## License

MIT
