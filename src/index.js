import './style.css';
import displayTodos from './frontend.js';
import { loadTodos } from './backend.js';

const todoapp = () => {
  displayTodos(loadTodos());
};

todoapp();
