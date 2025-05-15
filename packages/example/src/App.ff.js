<script>
  import { signal } from '@fastframe/core';
  import Counter from './components/Counter.ff.js';
  import TodoList from './components/TodoList.ff.js';
</script>

<template>
  <div class="app">
    <header class="header">
      <h1>FastFrame.js</h1>
    </header>

    <main class="main">
      <section class="section">
        <h2>Counter Example</h2>
        <Counter initial="0" />
      </section>

      <section class="section">
        <h2>Todo List Example</h2>
        <TodoList />
      </section>
    </main>

    <footer class="footer">
      <p>Built with FastFrame.js - The next-generation frontend framework</p>
    </footer>
  </div>
</template>

<style>
  /* Base styles */
  .app {
    min-height: 100vh;
    background-color: #ffffff;
    color: #333333;
  }

  /* Header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    border-bottom: 1px solid #eaeaea;
  }

  /* Main content */
  .main {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .section {
    margin-bottom: 2rem;
    padding: 1.5rem;
    border-radius: 8px;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Footer */
  .footer {
    text-align: center;
    padding: 1rem;
    border-top: 1px solid #eaeaea;
    margin-top: 2rem;
  }
</style>
