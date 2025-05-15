/**
 * Dev command
 * Starts the development server
 */

import * as path from 'path';
import chalk from 'chalk';
import { createServer } from 'vite';
import { fastframePlugin } from '@fastframe/compiler';
import { loadConfig } from '../utils/config';

interface DevOptions {
  port: string;
  host: string;
  open: boolean;
}

export async function devCommand(options: DevOptions): Promise<void> {
  try {
    // Load FastFrame config
    const config = await loadConfig();

    // Create Vite server
    const server = await createServer({
      root: process.cwd(),
      server: {
        port: parseInt(options.port, 10),
        host: options.host,
        open: options.open
      },
      // Use the default vite.config.js file
      configFile: undefined
    });

    // Start server
    await server.listen();

    // Log server info
    server.printUrls();

    console.log(`\n  ${chalk.green('FastFrame.js dev server running!')}`);
    console.log(`  ${chalk.gray('Local:')}`);
    console.log(`  ${chalk.cyan(`http://${options.host}:${options.port}`)}`);
  } catch (error) {
    console.error(chalk.red('Failed to start dev server:'));
    console.error(error);
    process.exit(1);
  }
}
