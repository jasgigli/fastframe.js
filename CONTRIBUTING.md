# Contributing to FastFrame.js

Thank you for your interest in contributing to FastFrame.js! This document provides guidelines and instructions for contributing to the project.

## Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [pnpm](https://pnpm.io/) (v7 or higher)

### Setup

1. Clone the repository:

```bash
git clone https://github.com/fastframejs/fastframe.git
cd fastframe
```

2. Install dependencies:

```bash
pnpm install
```

3. Build all packages:

```bash
pnpm build
```

## Project Structure

FastFrame.js is organized as a monorepo with the following packages:

- `packages/core`: Core runtime and reactivity primitives
- `packages/compiler`: Vite plugin and AST transforms
- `packages/cli`: Command-line interface
- `packages/create-fastframe`: Project scaffolding tool
- `packages/webpack-loader`: Webpack integration
- `packages/rollup-plugin`: Rollup integration
- `packages/docs`: Documentation site
- `packages/example`: Example application

## Development Workflow

### Running Tests

```bash
# Run tests for all packages
pnpm test

# Run tests for a specific package
pnpm --filter @fastframe/core test
```

### Running the Example App

```bash
pnpm dev
```

### Building Packages

```bash
# Build all packages
pnpm build

# Build a specific package
pnpm --filter @fastframe/core build
```

### Creating a New Package

To create a new package in the monorepo:

```bash
pnpm create-package package-name
```

For a scoped package:

```bash
pnpm create-package package-name --scope @fastframe
```

### Documentation

When adding new features, please update the relevant documentation in the `packages/docs` directory.

To run the documentation site locally:

```bash
pnpm docs:dev
```

## Pull Request Guidelines

1. Fork the repository and create a branch from `main`.
2. Make your changes and ensure tests pass.
3. Add tests for new features or bug fixes.
4. Update documentation if necessary.
5. Submit a pull request to the `main` branch.

## Commit Message Guidelines

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Changes to the build process or tools

Example:

```

feat(core): add computed function

```

## Code Style

We use ESLint and Prettier to enforce code style. Run the following to check and fix code style issues:

```bash
pnpm lint
```

## Release Process

Releases are managed by the core team. The process involves:

1. Updating version numbers with `pnpm version-packages <version>`
2. Building all packages with `pnpm build`
3. Running tests with `pnpm test`
4. Publishing to npm with `pnpm publish-packages`

## License

By contributing to FastFrame.js, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
