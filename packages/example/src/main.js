/**
 * FastFrame.js Example App
 * Main entry point
 */

import { mount } from '@fastframe/core';
import App from './App.js';

// Mount the app to the DOM
const app = document.getElementById('app');
mount(app, App);
