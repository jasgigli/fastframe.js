/**
 * FastFrame.js Rollup Plugin
 * Transforms .ff.js files for use with Rollup
 */

import { transform } from '@fastframe/compiler';
import { createFilter } from '@rollup/pluginutils';
import type { Plugin } from 'rollup';

/**
 * Options for the FastFrame.js Rollup plugin
 */
export interface FastframeRollupOptions {
  /**
   * Include files pattern
   * @default /\.ff\.js$/
   */
  include?: string | RegExp | (string | RegExp)[];
  
  /**
   * Exclude files pattern
   */
  exclude?: string | RegExp | (string | RegExp)[];
  
  /**
   * JSX factory function name
   * @default 'h'
   */
  jsxFactory?: string;
  
  /**
   * JSX fragment component name
   * @default 'Fragment'
   */
  jsxFragment?: string;
  
  /**
   * Enable development mode
   * @default process.env.NODE_ENV !== 'production'
   */
  dev?: boolean;
}

/**
 * FastFrame.js Rollup plugin
 * @param options - Plugin options
 */
export default function fastframeRollup(options: FastframeRollupOptions = {}): Plugin {
  const filter = createFilter(
    options.include || /\.ff\.js$/,
    options.exclude
  );
  
  return {
    name: 'fastframe',
    
    async transform(code, id) {
      // Skip if file doesn't match the filter
      if (!filter(id)) {
        return null;
      }
      
      try {
        // Transform the source code
        const result = await transform(code, id, options);
        
        // Return the transformed code
        return {
          code: result.code,
          map: result.map
        };
      } catch (error) {
        // Report errors
        this.error(error);
        return null;
      }
    }
  };
}

// Export the transform function for programmatic use
export { transform } from '@fastframe/compiler';
