/**
 * Counter Component
 */

import { signal, effect } from '@fastframe/core';

// Counter component
export default function Counter(props = {}) {
  // Convert initial value to number
  const initialValue = parseInt(props.initial, 10) || 0;

  // Create state manually without using signal
  let count = initialValue;
  let doubleCount = initialValue * 2;
  const subscribers = new Set();

  // Function to get count
  function getCount() {
    return count;
  }

  // Function to set count
  function setCount(newValue) {
    count = newValue;
    doubleCount = count * 2;
    // Notify subscribers
    subscribers.forEach(subscriber => subscriber());
  }

  // Create the component element
  const el = document.createElement('div');
  el.className = 'counter';

  // Create display section
  const display = document.createElement('div');
  display.className = 'display';

  const countEl = document.createElement('div');
  countEl.className = 'count';
  countEl.textContent = count;

  const doubleCountEl = document.createElement('div');
  doubleCountEl.className = 'double-count';
  doubleCountEl.textContent = `Double: ${doubleCount}`;

  // Create controls
  const controls = document.createElement('div');
  controls.className = 'controls';

  const decrementBtn = document.createElement('button');
  decrementBtn.className = 'decrement';
  decrementBtn.textContent = '-';
  decrementBtn.addEventListener('click', () => {
    setCount(count - 1);
  });

  const resetBtn = document.createElement('button');
  resetBtn.className = 'reset';
  resetBtn.textContent = 'Reset';
  resetBtn.addEventListener('click', () => {
    setCount(initialValue);
  });

  const incrementBtn = document.createElement('button');
  incrementBtn.className = 'increment';
  incrementBtn.textContent = '+';
  incrementBtn.addEventListener('click', () => {
    setCount(count + 1);
  });

  // Add buttons to controls
  controls.appendChild(decrementBtn);
  controls.appendChild(resetBtn);
  controls.appendChild(incrementBtn);

  // Add elements to display
  display.appendChild(countEl);
  display.appendChild(doubleCountEl);

  // Add display and controls to component
  el.appendChild(display);
  el.appendChild(controls);

  // Subscribe to state changes
  subscribers.add(() => {
    countEl.textContent = count;
    doubleCountEl.textContent = `Double: ${doubleCount}`;
  });

  // Add styles
  addStyles();

  return el;
}

// Add component styles
function addStyles() {
  const style = document.createElement('style');
  style.textContent = `
  .counter {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    border-radius: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .display {
    text-align: center;
    margin-bottom: 1rem;
  }

  .count {
    font-size: 3rem;
    font-weight: bold;
    color: #0074d9;
  }

  .double-count {
    font-size: 1rem;
    color: #666;
    margin-top: 0.5rem;
  }

  .controls {
    display: flex;
    gap: 0.5rem;
  }

  .counter button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .increment {
    background-color: #0074d9;
    color: white;
  }

  .decrement {
    background-color: #ff4136;
    color: white;
  }

  .reset {
    background-color: #aaaaaa;
    color: white;
  }

  .counter button:hover {
    opacity: 0.9;
  }
  `;

  // Only add the style once
  if (!document.head.querySelector('style[data-component="counter"]')) {
    style.setAttribute('data-component', 'counter');
    document.head.appendChild(style);
  }
}
