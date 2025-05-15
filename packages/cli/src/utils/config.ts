/**
 * Config utilities
 * Loads and validates FastFrame.js configuration
 */

import * as fs from 'fs-extra';
import * as path from 'path';

export interface FastframeConfig {
  plugins: any[];
  [key: string]: any;
}

/**
 * Default configuration
 */
const defaultConfig: FastframeConfig = {
  plugins: []
};

/**
 * Load FastFrame.js configuration
 * @returns The configuration object
 */
export async function loadConfig(): Promise<FastframeConfig> {
  const configPath = path.resolve(process.cwd(), 'ff.config.js');
  
  // Check if config file exists
  if (!fs.existsSync(configPath)) {
    return defaultConfig;
  }
  
  try {
    // Load config file
    const userConfig = require(configPath);
    
    // Merge with default config
    return {
      ...defaultConfig,
      ...userConfig
    };
  } catch (error) {
    console.error('Error loading configuration:', error);
    return defaultConfig;
  }
}
