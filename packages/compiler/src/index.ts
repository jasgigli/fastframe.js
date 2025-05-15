/**
 * FastFrame.js Compiler
 * Vite plugin and AST transforms for FastFrame.js
 */

import type { Plugin, UserConfig, ConfigEnv } from 'vite';
import type { ESBuildOptions } from 'vite';
import { transform } from './transform';

export { transform } from './transform';

/**
 * FastFrame Vite plugin
 * Processes .ff.js files and compiles them into optimized JavaScript
 */
export function fastframePlugin(options: FastframePluginOptions = {}): Plugin {
  return {
    name: 'vite-plugin-fastframe',
    enforce: 'pre',

    // Configure Vite
    configResolved(config) {
      // Store the resolved config
      console.log('FastFrame plugin config resolved');
    },

    config(config) {
      // Simple config to handle JSX in .ff.js files
      return {
        esbuild: {
          jsxFactory: options.jsxFactory || 'h',
          jsxFragment: options.jsxFragment || 'Fragment'
        }
      };
    },

    // Transform .ff.js files
    async transform(code, id) {
      // Only process .ff.js files
      if (!id.endsWith('.ff.js')) {
        return null;
      }

      try {
        const result = await transform(code, id, options);
        return {
          code: result.code,
          map: result.map
        };
      } catch (error) {
        console.error(`Error transforming ${id}:`, error);
        throw error;
      }
    },

    // Configure Vite server
    configureServer(server) {
      // Add custom middleware if needed
      return () => {
        server.middlewares.use((req, res, next) => {
          // Custom middleware logic
          next();
        });
      };
    },

    // Handle HMR
    handleHotUpdate(ctx) {
      // Custom HMR handling for .ff.js files
      if (ctx.file.endsWith('.ff.js')) {
        console.log('HMR update for', ctx.file);
      }
      return ctx.modules;
    }
  };
}

// Plugin options interface
export interface FastframePluginOptions {
  /**
   * Custom plugins to extend the compiler
   */
  plugins?: FastframePlugin[];

  /**
   * Development mode
   */
  dev?: boolean;

  /**
   * JSX factory function name
   */
  jsxFactory?: string;

  /**
   * JSX fragment function name
   */
  jsxFragment?: string;

  /**
   * Custom compiler hooks
   */
  hooks?: {
    beforeTransform?: (code: string, id: string) => string | Promise<string>;
    afterTransform?: (
      result: TransformResult
    ) => TransformResult | Promise<TransformResult>;
  };
}

// Plugin interface
export interface FastframePlugin {
  name: string;
  transform?: (code: string, id: string) => string | Promise<string>;
}

// Transform result interface
export interface TransformResult {
  code: string;
  map?: any;
}

// Default export
export default fastframePlugin;
