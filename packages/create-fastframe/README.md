# create-fastframe

Create FastFrame.js projects with one command.

## Usage

```bash
# npm
npm create fastframe my-app

# yarn
yarn create fastframe my-app

# pnpm
pnpm create fastframe my-app
```

Or directly with npx:

```bash
npx create-fastframe my-app
```

## Options

| Option | Description |
|--------|-------------|
| `--template <template>` | Template to use (default: default) |
| `--ts` | Use TypeScript |
| `--no-install` | Skip package installation |
| `--package-manager <pm>` | Package manager to use (npm, yarn, pnpm) |

## Examples

```bash
# Create a project with the default template
npm create fastframe my-app

# Create a TypeScript project
npm create fastframe my-app --ts

# Create a project with a specific template
npm create fastframe my-app --template typescript

# Create a project without installing dependencies
npm create fastframe my-app --no-install

# Create a project using yarn
npm create fastframe my-app --package-manager yarn
```

## Interactive Mode

If you run the command without specifying a project name, you'll enter interactive mode:

```bash
npm create fastframe
```

This will prompt you for:

1. Project name
2. Template to use
3. Package manager to use

## Available Templates

- `default` - Basic JavaScript template
- `typescript` - TypeScript template

## License

MIT
