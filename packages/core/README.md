# @fastframe/core

Core runtime and reactivity primitives for FastFrame.js.

## Installation

```bash
npm install @fastframe/core
```

## Usage

```js
import { signal, effect, mount } from '@fastframe/core';

// Create a reactive signal
const [count, setCount] = signal(0);

// Create an effect that runs when dependencies change
effect(() => {
  console.log('Count changed:', count());
});

// Update the signal
setCount(1); // Logs: "Count changed: 1"

// Mount a component to the DOM
const app = document.getElementById('app');
mount(app, () => {
  const el = document.createElement('div');
  el.textContent = `Count: ${count()}`;
  return el;
});
```

## API Reference

### `signal<T>(initialValue: T): Signal<T>`

Creates a reactive signal with getter and setter.

```js
const [count, setCount] = signal(0);
console.log(count()); // 0
setCount(1);
console.log(count()); // 1
```

### `effect(fn: () => void): () => void`

Creates an effect that automatically tracks and responds to signal changes.

```js
const cleanup = effect(() => {
  console.log('Count changed:', count());
});

// Later, to clean up the effect
cleanup();
```

### `computed<T>(fn: () => T): Signal<T>`

Creates a computed signal that derives its value from other signals.

```js
const [count, setCount] = signal(0);
const doubleCount = computed(() => count() * 2);

console.log(doubleCount()); // 0
setCount(5);
console.log(doubleCount()); // 10
```

### `mount(target: Element, component: () => Element): () => void`

Mounts a component to a DOM element.

```js
const unmount = mount(document.getElementById('app'), () => {
  const el = document.createElement('div');
  el.textContent = 'Hello, world!';
  return el;
});

// Later, to unmount the component
unmount();
```

## License

MIT
