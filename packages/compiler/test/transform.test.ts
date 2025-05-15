import { describe, it, expect } from 'vitest';
import { transform } from '../src/transform';

describe('transform', () => {
  it('should transform a basic component', async () => {
    const source = `
<script>
  import { signal } from '@fastframe/core';
  const [count, setCount] = signal(0);
  function increment() {
    setCount(count() + 1);
  }
</script>

<template>
  <div>
    <h1>Count: {count()}</h1>
    <button onclick="{increment}">Increment</button>
  </div>
</template>
`;

    const result = await transform(source, 'test.ff.js');
    
    // Check that the result contains the script content
    expect(result.code).toContain('import { signal }');
    expect(result.code).toContain('const [count, setCount] = signal(0)');
    
    // Check that the result contains the render function
    expect(result.code).toContain('function render()');
    
    // Check that the result imports from @fastframe/core
    expect(result.code).toContain("import { signal, effect, mount } from '@fastframe/core'");
    
    // Check that the result exports the mount function
    expect(result.code).toContain('export { mount }');
    
    // Check that the result exports the render function
    expect(result.code).toContain('export default render');
  });
  
  it('should handle components with styles', async () => {
    const source = `
<script>
  import { signal } from '@fastframe/core';
  const [count, setCount] = signal(0);
</script>

<template>
  <div class="counter">
    <h1>Count: {count()}</h1>
  </div>
</template>

<style>
  .counter {
    padding: 1rem;
  }
</style>
`;

    const result = await transform(source, 'test.ff.js');
    
    // Check that the result contains style handling
    expect(result.code).toContain('const style = document.createElement(\'style\')');
    expect(result.code).toContain('.counter {');
  });
});
