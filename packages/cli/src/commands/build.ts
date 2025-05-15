/**
 * Build command
 * Builds the project for production
 */

import * as path from 'path';
import chalk from 'chalk';
import { build } from 'vite';
import ora from 'ora';
import { fastframePlugin } from '@fastframe/compiler';
import { loadConfig } from '../utils/config';

interface BuildOptions {
  outDir: string;
  analyze: boolean;
}

export async function buildCommand(options: BuildOptions): Promise<void> {
  const spinner = ora('Building for production...').start();

  try {
    // Load FastFrame config
    const config = await loadConfig();

    // Build with Vite
    await build({
      root: process.cwd(),
      build: {
        outDir: options.outDir,
        emptyOutDir: true,
        minify: true,
        sourcemap: true
      },
      // Use the default vite.config.js file
      configFile: undefined
    });

    spinner.succeed('Build complete');
    console.log(
      `\n  ${chalk.green('✓')} Build artifacts generated in ${chalk.cyan(
        options.outDir
      )}`
    );

    // Analyze bundle if requested
    if (options.analyze) {
      console.log(`\n  ${chalk.yellow('Bundle analysis:')}`);
      // Implement bundle analysis logic here
    }
  } catch (error) {
    spinner.fail('Build failed');
    console.error(error);
    process.exit(1);
  }
}
