# Core API Reference

This page documents the core API of FastFrame.js.

## Reactivity

### `signal`

Creates a reactive signal with getter and setter functions.

```js
import { signal } from '@fastframe/core';

// Create a signal with initial value
const [count, setCount] = signal(0);

// Read the value
console.log(count()); // 0

// Update the value
setCount(1);
console.log(count()); // 1

// Update based on previous value
setCount(prev => prev + 1);
console.log(count()); // 2
```

#### Type Signature

```ts
function signal<T>(initialValue: T): [() => T, (value: T | ((prev: T) => T)) => void]
```

### `computed`

Creates a computed signal that derives its value from other signals.

```js
import { signal, computed } from '@fastframe/core';

const [count, setCount] = signal(0);
const doubleCount = computed(() => count() * 2);

console.log(doubleCount()); // 0
setCount(5);
console.log(doubleCount()); // 10
```

#### Type Signature

```ts
function computed<T>(fn: () => T): () => T
```

### `effect`

Creates an effect that runs when its dependencies change.

```js
import { signal, effect } from '@fastframe/core';

const [count, setCount] = signal(0);

effect(() => {
  console.log(`Count changed: ${count()}`);
});

// Logs: "Count changed: 0" (initial run)
setCount(1); // Logs: "Count changed: 1"
```

#### Type Signature

```ts
function effect(fn: () => void): () => void
```

The return value is a function that can be called to stop the effect.

## Rendering

### `mount`

Mounts a component to a DOM element.

```js
import { mount } from '@fastframe/core';
import App from './App.ff.js';

const root = document.getElementById('app');
mount(root, App);
```

#### Type Signature

```ts
function mount(element: HTMLElement, component: Component): void
```

### `h`

Creates a virtual DOM node (used internally by the compiler).

```js
import { h } from '@fastframe/core';

const vnode = h('div', { class: 'container' }, [
  h('h1', null, 'Hello, world!'),
  h('p', null, 'This is FastFrame.js')
]);
```

#### Type Signature

```ts
function h(
  tag: string | Component,
  props: Record<string, any> | null,
  children: (string | VNode)[] | string | null
): VNode
```

## Lifecycle

### `onMount`

Registers a callback to be called when the component is mounted.

```js
import { onMount } from '@fastframe/core';

onMount(() => {
  console.log('Component mounted');
  
  // Return a cleanup function (optional)
  return () => {
    console.log('Component unmounted');
  };
});
```

#### Type Signature

```ts
function onMount(fn: () => (() => void) | void): void
```

### `onUpdate`

Registers a callback to be called when the component updates.

```js
import { onUpdate } from '@fastframe/core';

onUpdate(() => {
  console.log('Component updated');
});
```

#### Type Signature

```ts
function onUpdate(fn: () => void): void
```

## Component Props

### `defineProps`

Defines the props for a component with optional default values.

```js
import { defineProps } from '@fastframe/core';

const props = defineProps({
  name: 'World',
  count: 0
});

console.log(props.name); // "World" (or value passed from parent)
```

#### Type Signature

```ts
function defineProps<T extends Record<string, any>>(defaults: T): T
```
