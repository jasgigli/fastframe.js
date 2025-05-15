/**
 * FastFrame.js Webpack Loader
 * Transforms .ff.js files for use with webpack
 */

import { transform } from '@fastframe/compiler';
import { getOptions } from 'loader-utils';
import type { LoaderContext } from 'webpack';

/**
 * FastFrame.js webpack loader
 * @param this - Webpack loader context
 * @param source - Source code
 */
export default async function fastframeLoader(
  this: LoaderContext<any>,
  source: string
): Promise<string | undefined> {
  // Make the loader async
  const callback = this.async();
  
  // Get loader options
  const options = getOptions(this) || {};
  
  // Only process .ff.js files
  if (!this.resourcePath.endsWith('.ff.js')) {
    return callback?.(null, source);
  }
  
  try {
    // Transform the source code
    const result = await transform(source, this.resourcePath, options);
    
    // Return the transformed code
    callback?.(null, result.code, result.map);
  } catch (error: any) {
    // Report errors
    callback?.(error);
  }
}

// Export the transform function for programmatic use
export { transform } from '@fastframe/compiler';
