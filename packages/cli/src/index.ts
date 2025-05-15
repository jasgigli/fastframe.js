/**
 * FastFrame.js CLI
 * Command-line interface for FastFrame.js
 */

import { Command } from 'commander';
import chalk from 'chalk';
import { initCommand } from './commands/init';
import { devCommand } from './commands/dev';
import { buildCommand } from './commands/build';
import { generateCommand } from './commands/generate';

// Create the CLI program
const program = new Command();

// Set up the CLI
program
  .name('fastframe')
  .description('FastFrame.js CLI')
  .version('0.1.0');

// Init command
program
  .command('init')
  .description('Initialize a new FastFrame.js project')
  .argument('[name]', 'Project name')
  .option('-t, --template <template>', 'Template to use', 'default')
  .option('--ts', 'Use TypeScript', false)
  .action(initCommand);

// Dev command
program
  .command('dev')
  .description('Start the development server')
  .option('-p, --port <port>', 'Port to use', '3000')
  .option('-h, --host <host>', 'Host to use', 'localhost')
  .option('--open', 'Open in browser', false)
  .action(devCommand);

// Build command
program
  .command('build')
  .description('Build for production')
  .option('-o, --outDir <outDir>', 'Output directory', 'dist')
  .option('--analyze', 'Analyze bundle size', false)
  .action(buildCommand);

// Generate command
program
  .command('generate')
  .description('Generate a component or other code')
  .argument('<type>', 'Type of code to generate (component, page, etc.)')
  .argument('<name>', 'Name of the code to generate')
  .option('-d, --dir <dir>', 'Directory to generate in', 'src')
  .action(generateCommand);

// Parse arguments
program.parse();

// If no arguments, show help
if (process.argv.length <= 2) {
  console.log(chalk.bold('\nFastFrame.js CLI'));
  console.log(chalk.gray('Next-generation frontend framework\n'));
  program.help();
}
