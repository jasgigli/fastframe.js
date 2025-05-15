/**
 * FastFrame.js Core
 * Reactive primitives and runtime for FastFrame.js
 */

// Types
export type Subscriber = () => void;
export type Getter<T> = () => T;
export type Setter<T> = (value: T) => void;
export type Signal<T> = [Getter<T>, Setter<T>];

// Internal state
let currentEffect: Subscriber | null = null;
const effectStack: Subscriber[] = [];

/**
 * Creates a reactive signal with getter and setter
 * @param initialValue The initial value of the signal
 * @returns An array containing the getter and setter functions
 */
export function signal<T>(initialValue: T): [() => T, (newValue: T) => void] {
  const subscribers = new Set<Subscriber>();
  let value = initialValue;

  // Create getter function that tracks dependencies
  const getter = () => {
    if (currentEffect) {
      subscribers.add(currentEffect);
    }
    return value;
  };

  // Create setter function
  const setter = (newValue: T) => {
    if (Object.is(value, newValue)) return;
    value = newValue;

    // Create a copy to avoid issues if subscribers are modified during execution
    const currentSubscribers = [...subscribers];
    for (const subscriber of currentSubscribers) {
      subscriber();
    }
  };

  // Return getter and setter as an array
  return [getter, setter];
}

/**
 * Creates an effect that automatically tracks and responds to signal changes
 * @param fn The effect function to run
 * @returns A cleanup function to stop the effect
 */
export function effect(fn: Subscriber): () => void {
  const execute = () => {
    // Clean up previous dependencies
    cleanup(execute);

    // Set up the current effect
    currentEffect = execute;
    effectStack.push(execute);

    try {
      fn();
    } finally {
      effectStack.pop();
      currentEffect =
        effectStack.length > 0 ? effectStack[effectStack.length - 1] : null;
    }
  };

  // Initial execution
  execute();

  // Return cleanup function
  return () => cleanup(execute);
}

/**
 * Cleans up an effect's dependencies
 */
function cleanup(fn: Subscriber): void {
  // This would be implemented to remove the effect from all signals it depends on
  // For this simple implementation, we'll skip the full cleanup logic
}

/**
 * Creates a computed signal that derives its value from other signals
 * @param fn The computation function
 * @returns A read-only signal function
 */
export function computed<T>(fn: () => T): () => T {
  const [getValue, setValue] = signal<T>(fn());
  effect(() => setValue(fn()));

  // Return a read-only version (just the getter)
  return getValue;
}

/**
 * Mounts a component to a DOM element
 * @param target The DOM element to mount to
 * @param component The component function that returns an element
 */
export function mount(target: Element, component: () => Element): () => void {
  const el = component();
  target.appendChild(el);

  // Return unmount function
  return () => {
    if (target.contains(el)) {
      target.removeChild(el);
    }
  };
}

/**
 * Creates an HTML element with attributes and children
 * @param tag The HTML tag name
 * @param props The element properties and attributes
 * @param children The child elements or text
 * @returns The created HTML element
 */
export function h(
  tag: string,
  props: Record<string, any> = {},
  ...children: (Node | string)[]
): HTMLElement {
  const element = document.createElement(tag);

  // Set properties and attributes
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith('on') && typeof value === 'function') {
      // Event handlers
      const eventName = key.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else {
      // Regular attributes
      element.setAttribute(key, String(value));
    }
  }

  // Append children
  for (const child of children) {
    if (typeof child === 'string') {
      element.appendChild(document.createTextNode(child));
    } else {
      element.appendChild(child);
    }
  }

  return element;
}
