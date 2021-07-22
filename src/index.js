import './style.css';
import displayTodos from './frontend.js';
import { todos } from './data.js';

const todoapp = () => {
  let todoLs = JSON.parse(localStorage.getItem('todos'));

  if (todoLs === null) {
    todoLs = todos;
  }
  displayTodos(todos);
};

todoapp();
