# @fastframe/webpack-loader

Webpack loader for FastFrame.js.

## Installation

```bash
npm install @fastframe/webpack-loader
```

## Usage

### webpack.config.js

```js
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

### With options

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ff\.js$/,
        use: {
          loader: '@fastframe/webpack-loader',
          options: {
            // Loader options
            jsxFactory: 'h',
            jsxFragment: 'Fragment'
          }
        }
      }
    ]
  }
};
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `jsxFactory` | `string` | `'h'` | JSX factory function name |
| `jsxFragment` | `string` | `'Fragment'` | JSX fragment component name |
| `dev` | `boolean` | `process.env.NODE_ENV !== 'production'` | Enable development mode |

## Example

```js
// webpack.config.js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ff\.js$/,
        use: '@fastframe/webpack-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ff.js']
  }
};
```

## License

MIT
