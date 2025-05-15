<script>
  import { signal, effect } from '@fastframe/core';
  
  // Todo list state
  const [todos, setTodos] = signal([
    { id: 1, text: 'Learn FastFrame.js', completed: false },
    { id: 2, text: 'Build an app', completed: false },
    { id: 3, text: 'Profit!', completed: false }
  ]);
  
  // New todo input
  const [newTodo, setNewTodo] = signal('');
  
  // Computed values
  const [completedCount, setCompletedCount] = signal(0);
  const [remainingCount, setRemainingCount] = signal(0);
  
  // Update counts when todos change
  effect(() => {
    const completed = todos().filter(todo => todo.completed).length;
    setCompletedCount(completed);
    setRemainingCount(todos().length - completed);
  });
  
  // Add a new todo
  function addTodo(e) {
    e.preventDefault();
    
    if (!newTodo().trim()) return;
    
    const newTodoItem = {
      id: Date.now(),
      text: newTodo().trim(),
      completed: false
    };
    
    setTodos([...todos(), newTodoItem]);
    setNewTodo('');
  }
  
  // Toggle todo completion
  function toggleTodo(id) {
    setTodos(
      todos().map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
  
  // Remove a todo
  function removeTodo(id) {
    setTodos(todos().filter(todo => todo.id !== id));
  }
  
  // Clear completed todos
  function clearCompleted() {
    setTodos(todos().filter(todo => !todo.completed));
  }
  
  // Handle input change
  function handleInput(e) {
    setNewTodo(e.target.value);
  }
</script>

<template>
  <div class="todo-list">
    <form class="todo-form" onsubmit="{addTodo}">
      <input
        type="text"
        class="todo-input"
        placeholder="Add a new todo..."
        value="{newTodo()}"
        oninput="{handleInput}"
      />
      <button type="submit" class="add-button">Add</button>
    </form>
    
    <ul class="todos">
      {todos().map(todo => (
        <li class="todo-item" key="{todo.id}">
          <input
            type="checkbox"
            checked="{todo.completed}"
            onchange="{() => toggleTodo(todo.id)}"
          />
          <span class="{todo.completed ? 'completed' : ''}">{todo.text}</span>
          <button class="remove-button" onclick="{() => removeTodo(todo.id)}">×</button>
        </li>
      ))}
    </ul>
    
    <div class="todo-stats">
      <span>{remainingCount()} items left</span>
      <button class="clear-button" onclick="{clearCompleted}" disabled="{completedCount() === 0}">
        Clear completed ({completedCount()})
      </button>
    </div>
  </div>
</template>

<style>
  .todo-list {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
  
  .todo-form {
    display: flex;
    padding: 1rem;
    border-bottom: 1px solid #eaeaea;
  }
  
  .todo-input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px 0 0 4px;
    font-size: 1rem;
  }
  
  .add-button {
    padding: 0.5rem 1rem;
    background-color: #0074d9;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
  }
  
  .todos {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .todo-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #eaeaea;
  }
  
  .todo-item input[type="checkbox"] {
    margin-right: 0.5rem;
  }
  
  .todo-item span {
    flex: 1;
  }
  
  .todo-item span.completed {
    text-decoration: line-through;
    color: #aaa;
  }
  
  .remove-button {
    background: none;
    border: none;
    color: #ff4136;
    font-size: 1.2rem;
    cursor: pointer;
  }
  
  .todo-stats {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    font-size: 0.9rem;
    color: #666;
  }
  
  .clear-button {
    background: none;
    border: none;
    color: #0074d9;
    cursor: pointer;
  }
  
  .clear-button:disabled {
    color: #aaa;
    cursor: not-allowed;
  }
</style>
