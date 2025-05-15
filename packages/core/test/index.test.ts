import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signal, effect, computed } from '../src';

describe('signal', () => {
  it('should create a signal with initial value', () => {
    const [count] = signal(0);
    expect(count()).toBe(0);
  });
  
  it('should update signal value', () => {
    const [count, setCount] = signal(0);
    setCount(1);
    expect(count()).toBe(1);
  });
  
  it('should not update if value is the same', () => {
    const [count, setCount] = signal(0);
    const fn = vi.fn();
    effect(() => {
      count();
      fn();
    });
    
    // First call happens during effect initialization
    expect(fn).toHaveBeenCalledTimes(1);
    
    setCount(0); // Same value, should not trigger effect
    expect(fn).toHaveBeenCalledTimes(1);
    
    setCount(1); // Different value, should trigger effect
    expect(fn).toHaveBeenCalledTimes(2);
  });
});

describe('effect', () => {
  it('should run immediately', () => {
    const fn = vi.fn();
    effect(fn);
    expect(fn).toHaveBeenCalledTimes(1);
  });
  
  it('should track dependencies', () => {
    const [count, setCount] = signal(0);
    const fn = vi.fn(() => {
      count();
    });
    
    effect(fn);
    expect(fn).toHaveBeenCalledTimes(1);
    
    setCount(1);
    expect(fn).toHaveBeenCalledTimes(2);
  });
  
  it('should handle nested effects', () => {
    const [count, setCount] = signal(0);
    const [doubled, setDoubled] = signal(0);
    
    const innerFn = vi.fn(() => {
      doubled();
    });
    
    const outerFn = vi.fn(() => {
      count();
      effect(innerFn);
    });
    
    effect(outerFn);
    expect(outerFn).toHaveBeenCalledTimes(1);
    expect(innerFn).toHaveBeenCalledTimes(1);
    
    setCount(1);
    expect(outerFn).toHaveBeenCalledTimes(2);
    expect(innerFn).toHaveBeenCalledTimes(2);
    
    setDoubled(2);
    expect(outerFn).toHaveBeenCalledTimes(2);
    expect(innerFn).toHaveBeenCalledTimes(3);
  });
  
  it('should return cleanup function', () => {
    const [count, setCount] = signal(0);
    const fn = vi.fn(() => {
      count();
    });
    
    const cleanup = effect(fn);
    expect(fn).toHaveBeenCalledTimes(1);
    
    cleanup();
    setCount(1);
    expect(fn).toHaveBeenCalledTimes(1); // Should not be called again
  });
});

describe('computed', () => {
  it('should compute derived value', () => {
    const [count, setCount] = signal(1);
    const doubled = computed(() => count() * 2);
    
    expect(doubled()).toBe(2);
    
    setCount(2);
    expect(doubled()).toBe(4);
  });
  
  it('should only recompute when dependencies change', () => {
    const [count, setCount] = signal(1);
    const fn = vi.fn(() => count() * 2);
    const doubled = computed(fn);
    
    expect(doubled()).toBe(2);
    expect(fn).toHaveBeenCalledTimes(1);
    
    doubled(); // Should use cached value
    expect(fn).toHaveBeenCalledTimes(1);
    
    setCount(2); // Should trigger recomputation
    expect(doubled()).toBe(4);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
