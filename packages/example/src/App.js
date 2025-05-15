/**
 * FastFrame.js Example App
 */

import { signal, effect, mount } from '@fastframe/core';
import Counter from './components/Counter.js';
import TodoList from './components/TodoList.js';

// Create the app component
export default function App() {
  // Create the root element
  const el = document.createElement('div');
  el.className = 'app';

  // Create header
  const header = document.createElement('header');
  header.className = 'header';

  const title = document.createElement('h1');
  title.textContent = 'FastFrame.js Example';
  header.appendChild(title);

  // Create main content
  const main = document.createElement('main');
  main.className = 'main';

  // Counter section
  const counterSection = document.createElement('section');
  counterSection.className = 'section';

  const counterTitle = document.createElement('h2');
  counterTitle.textContent = 'Counter Example';
  counterSection.appendChild(counterTitle);

  // Mount Counter component
  const counterContainer = document.createElement('div');
  counterSection.appendChild(counterContainer);
  mount(counterContainer, () => Counter({ initial: 0 }));

  // Todo list section
  const todoSection = document.createElement('section');
  todoSection.className = 'section';

  const todoTitle = document.createElement('h2');
  todoTitle.textContent = 'Todo List Example';
  todoSection.appendChild(todoTitle);

  // Mount TodoList component
  const todoContainer = document.createElement('div');
  todoSection.appendChild(todoContainer);
  mount(todoContainer, TodoList);

  // Add sections to main
  main.appendChild(counterSection);
  main.appendChild(todoSection);

  // Create footer
  const footer = document.createElement('footer');
  footer.className = 'footer';

  const footerText = document.createElement('p');
  footerText.textContent =
    'Built with FastFrame.js - The next-generation frontend framework';
  footer.appendChild(footerText);

  // Add all elements to the root
  el.appendChild(header);
  el.appendChild(main);
  el.appendChild(footer);

  // Add styles
  addStyles();

  return el;
}

// Add styles to the document
function addStyles() {
  const style = document.createElement('style');
  style.textContent = `
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
  `;
  document.head.appendChild(style);
}
