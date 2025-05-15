<script>
  import { signal, effect } from '@fastframe/core';
  
  // Component props
  export let props = {
    initial: 0
  };
  
  // Convert initial value to number
  const initialValue = parseInt(props.initial, 10) || 0;
  
  // Counter state
  const [count, setCount] = signal(initialValue);
  const [doubleCount, setDoubleCount] = signal(initialValue * 2);
  
  // Update double count when count changes
  effect(() => {
    setDoubleCount(count() * 2);
  });
  
  // Increment counter
  function increment() {
    setCount(count() + 1);
  }
  
  // Decrement counter
  function decrement() {
    setCount(count() - 1);
  }
  
  // Reset counter
  function reset() {
    setCount(initialValue);
  }
</script>

<template>
  <div class="counter">
    <div class="display">
      <div class="count">{count()}</div>
      <div class="double-count">Double: {doubleCount()}</div>
    </div>
    
    <div class="controls">
      <button class="decrement" onclick="{decrement}">-</button>
      <button class="reset" onclick="{reset}">Reset</button>
      <button class="increment" onclick="{increment}">+</button>
    </div>
  </div>
</template>

<style>
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
  
  button {
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
  
  button:hover {
    opacity: 0.9;
  }
</style>
