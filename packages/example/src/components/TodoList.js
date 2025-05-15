/**
 * TodoList Component
 */

import { signal, effect } from '@fastframe/core';

// TodoList component
export default function TodoList() {
  // Create state manually without using signal
  let todoItems = [
    { id: 1, text: 'Learn FastFrame.js', completed: false },
    { id: 2, text: 'Build an app', completed: false },
    { id: 3, text: 'Profit!', completed: false }
  ];
  let newTodoText = '';
  let completedCount = 0;
  let remainingCount = todoItems.length;

  // Create a subscribers set for reactivity
  const subscribers = new Set();

  // Functions to get state
  function todos() {
    return todoItems;
  }

  function newTodo() {
    return newTodoText;
  }

  // Functions to update state
  function setTodos(newTodos) {
    todoItems = newTodos;
    updateCounts();
    notifySubscribers();
  }

  function setNewTodo(text) {
    newTodoText = text;
    notifySubscribers();
  }

  function setCompletedCount(count) {
    completedCount = count;
    notifySubscribers();
  }

  function setRemainingCount(count) {
    remainingCount = count;
    notifySubscribers();
  }

  // Update counts
  function updateCounts() {
    const completed = todoItems.filter(todo => todo.completed).length;
    completedCount = completed;
    remainingCount = todoItems.length - completed;
  }

  // Notify all subscribers
  function notifySubscribers() {
    subscribers.forEach(subscriber => subscriber());
  }

  // Initial count calculation
  updateCounts();

  // Create the component element
  const el = document.createElement('div');
  el.className = 'todo-list';

  // Create form for adding todos
  const form = document.createElement('form');
  form.className = 'todo-form';

  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'todo-input';
  input.placeholder = 'Add a new todo...';

  const addButton = document.createElement('button');
  addButton.type = 'submit';
  addButton.className = 'add-button';
  addButton.textContent = 'Add';

  // Add input and button to form
  form.appendChild(input);
  form.appendChild(addButton);

  // Create todo list
  const todoList = document.createElement('ul');
  todoList.className = 'todos';

  // Create stats section
  const stats = document.createElement('div');
  stats.className = 'todo-stats';

  const itemsLeft = document.createElement('span');

  const clearButton = document.createElement('button');
  clearButton.className = 'clear-button';

  // Add elements to stats
  stats.appendChild(itemsLeft);
  stats.appendChild(clearButton);

  // Add all sections to component
  el.appendChild(form);
  el.appendChild(todoList);
  el.appendChild(stats);

  // Handle form submission
  form.addEventListener('submit', e => {
    e.preventDefault();

    if (!newTodo().trim()) return;

    const newTodoItem = {
      id: Date.now(),
      text: newTodo().trim(),
      completed: false
    };

    setTodos([...todos(), newTodoItem]);
    setNewTodo('');
    input.value = '';
  });

  // Handle input changes
  input.addEventListener('input', e => {
    setNewTodo(e.target.value);
  });

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
  clearButton.addEventListener('click', () => {
    setTodos(todos().filter(todo => !todo.completed));
  });

  // Update the todo list when todos change
  function updateTodoList() {
    // Clear the list
    todoList.innerHTML = '';

    // Add each todo
    todos().forEach(todo => {
      const item = document.createElement('li');
      item.className = 'todo-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => toggleTodo(todo.id));

      const text = document.createElement('span');
      text.textContent = todo.text;
      if (todo.completed) {
        text.classList.add('completed');
      }

      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-button';
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', () => removeTodo(todo.id));

      item.appendChild(checkbox);
      item.appendChild(text);
      item.appendChild(removeBtn);

      todoList.appendChild(item);
    });

    // Update stats
    itemsLeft.textContent = `${remainingCount} items left`;
    clearButton.textContent = `Clear completed (${completedCount})`;
    clearButton.disabled = completedCount === 0;
  }

  // Subscribe to state changes
  subscribers.add(updateTodoList);

  // Initial render
  updateTodoList();

  // Add styles
  addStyles();

  return el;
}

// Add component styles
function addStyles() {
  const style = document.createElement('style');
  style.textContent = `
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
  `;

  // Only add the style once
  if (!document.head.querySelector('style[data-component="todo-list"]')) {
    style.setAttribute('data-component', 'todo-list');
    document.head.appendChild(style);
  }
}
