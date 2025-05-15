/**
 * FastFrame.js Transform
 * Transforms .ff.js files into optimized JavaScript
 */

import { parse as parseHtml } from 'parse5';
import MagicString from 'magic-string';
import { FastframePluginOptions, TransformResult } from './index';

/**
 * Transform a .ff.js file into JavaScript
 * @param source The source code
 * @param id The file ID
 * @param options Plugin options
 * @returns The transformed code
 */
export async function transform(
  source: string,
  id: string,
  options: FastframePluginOptions = {}
): Promise<TransformResult> {
  // Apply beforeTransform hook if provided
  if (options.hooks?.beforeTransform) {
    source = await options.hooks.beforeTransform(source, id);
  }

  // Parse the source code
  const { script, template, style } = parseComponent(source);

  // Create a new MagicString instance for source manipulation
  const s = new MagicString(source);

  // Generate the output code
  const scriptContent = script?.content || '';
  const templateCode = template ? compileTemplate(template.content) : '';

  // Replace the entire source with the compiled output
  s.overwrite(
    0,
    source.length,
    generateOutput(scriptContent, templateCode, style?.content)
  );

  // Create the result
  const result: TransformResult = {
    code: s.toString(),
    map: s.generateMap({ hires: true })
  };

  // Apply afterTransform hook if provided
  if (options.hooks?.afterTransform) {
    return await options.hooks.afterTransform(result);
  }

  return result;
}

/**
 * Parse a FastFrame component into its parts
 * @param source The source code
 * @returns The parsed component parts
 */
function parseComponent(source: string): {
  script: { content: string } | null;
  template: { content: string } | null;
  style: { content: string } | null;
} {
  // Simple regex-based parsing for now
  // In a real implementation, we would use a proper HTML parser

  const scriptMatch = source.match(/<script>([\s\S]*?)<\/script>/);
  const templateMatch = source.match(/<template>([\s\S]*?)<\/template>/);
  const styleMatch = source.match(/<style>([\s\S]*?)<\/style>/);

  let scriptContent = '';
  if (scriptMatch && scriptMatch[1]) {
    // Clean up the script content
    scriptContent = scriptMatch[1].trim();
  }

  return {
    script: { content: scriptContent },
    template: templateMatch ? { content: templateMatch[1].trim() } : null,
    style: styleMatch ? { content: styleMatch[1].trim() } : null
  };
}

/**
 * Compile a template into JavaScript
 * @param template The template HTML
 * @returns The compiled JavaScript
 */
function compileTemplate(template: string): string {
  // This is a simplified implementation
  // In a real compiler, we would parse the HTML and generate optimized code

  // Parse the template
  const document = parseHtml(template) as any;

  // Generate code that creates the DOM elements
  return `
// Template render function
function render() {
  const el = document.createElement('div');
  el.innerHTML = ${JSON.stringify(template)};

  // Set up reactive bindings
  _setupBindings(el);

  return el.firstElementChild || el;
}

// Set up reactive bindings
function _setupBindings(rootEl) {
  // Find elements with reactive bindings
  const elementsWithBindings = rootEl.querySelectorAll('[\\{]');

  for (const el of elementsWithBindings) {
    // Process text bindings
    _processTextBindings(el);

    // Process attribute bindings
    _processAttributeBindings(el);

    // Process event bindings
    _processEventBindings(el);
  }
}

// Process text bindings
function _processTextBindings(el) {
  const textContent = el.textContent;
  if (textContent.includes('{') && textContent.includes('}')) {
    const parts = textContent.split(/\\{([^}]+)\\}/g);

    // Create effect to update text content
    effect(() => {
      let result = '';
      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
          // Static text
          result += parts[i];
        } else {
          // Dynamic expression
          try {
            // Use Function instead of eval for better scoping
            const evalFn = new Function('return ' + parts[i]);
            result += evalFn.call(this);
          } catch (e) {
            console.error('Error evaluating expression:', parts[i], e);
          }
        }
      }
      el.textContent = result;
    });
  }
}

// Process attribute bindings
function _processAttributeBindings(el) {
  // Implementation omitted for brevity
}

// Process event bindings
function _processEventBindings(el) {
  // Implementation omitted for brevity
}
`;
}

/**
 * Generate the final output code
 * @param script The script content
 * @param template The compiled template
 * @param style The style content
 * @returns The generated code
 */
function generateOutput(
  script: string,
  template: string,
  style?: string
): string {
  // Check if the script already imports from @fastframe/core
  const hasImport =
    script.includes("from '@fastframe/core'") ||
    script.includes('from "@fastframe/core"');
  const hasSignalImport = script.includes('signal');
  const hasEffectImport = script.includes('effect');
  const hasMountImport = script.includes('mount');

  // Prepare the imports based on what's already imported
  let imports = '';
  if (!hasImport) {
    imports = "import { signal, effect, mount } from '@fastframe/core';\n";
  } else {
    // Add any missing imports
    const missingImports = [];
    if (!hasSignalImport) missingImports.push('signal');
    if (!hasEffectImport) missingImports.push('effect');
    if (!hasMountImport) missingImports.push('mount');

    if (missingImports.length > 0) {
      imports = `import { ${missingImports.join(
        ', '
      )} } from '@fastframe/core';\n`;
    }
  }

  return `
// Imports
${imports}
// Script
${script}

// Template
${template}

// Style
${
  style
    ? `
// Apply styles
(function() {
  const style = document.createElement('style');
  style.textContent = ${JSON.stringify(style)};
  document.head.appendChild(style);
})();
`
    : ''
}

// Export mount function
export { mount };

// Export render function
export default render;
`;
}
