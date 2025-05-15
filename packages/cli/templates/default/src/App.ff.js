<script>
  import { signal, effect } from '@fastframe/core';
  
  // Create a reactive signal
  const [count, setCount] = signal(0);
  
  // Log changes to the count
  effect(() => {
    console.log('Count changed:', count());
  });
  
  // Increment the count
  function increment() {
    setCount(count() + 1);
  }
</script>

<template>
  <div class="app">
    <header class="header">
      <img src="/favicon.svg" alt="FastFrame.js Logo" class="logo" />
      <h1>Welcome to FastFrame.js</h1>
    </header>
    
    <main class="main">
      <div class="card">
        <button onclick="{increment}">
          Count is {count()}
        </button>
        <p>
          Edit <code>src/App.ff.js</code> and save to test HMR
        </p>
      </div>
      
      <p class="read-the-docs">
        Click on the FastFrame.js logo to learn more
      </p>
    </main>
  </div>
</template>

<style>
  .app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  
  .header {
    margin-bottom: 2rem;
  }
  
  .card {
    padding: 2em;
  }
  
  .read-the-docs {
    color: #888;
  }
  
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    color: #ffffff;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  
  button:hover {
    border-color: #646cff;
  }
  
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
  
  code {
    background-color: #f9f9f9;
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
</style>
