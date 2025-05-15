/**
 * FastFrame.js App
 * Main entry point
 */

import { mount } from '@fastframe/core';
import App from './App.ff.js';

// Mount the app to the DOM
const app = document.getElementById('app');
mount(app, App);
