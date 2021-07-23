/* eslint-disable import/no-mutable-exports */

let todos = [];
const loadTodos = () => {
  let fromLocal = JSON.parse(localStorage.getItem('todos'));

  if (fromLocal == null) {
    fromLocal = [];
  }
  todos = fromLocal;

  return todos;
};

const emptyTodos = () => {
  todos = [];
};

const todoslocal = () => {
  const todosJson = JSON.stringify(todos);
  localStorage.setItem('todos', todosJson);
};

const addTodos = (description, completed, index) => {
  todos.push({ description, completed, index: parseInt(index, 10) });
};

const updateTodos = (index, description) => {
  const todoInTodos = todos.find((t) => t.index === index);

  todoInTodos.description = description;

  todoslocal();
};

const createTodos = (description) => {
  let index = 0;
  if (todos.length > 0) {
    index = todos[todos.length - 1].index + 1;
  }

  addTodos(description, false, index);
  todoslocal();
};

export {
  todos, loadTodos, todoslocal, addTodos, emptyTodos, updateTodos, createTodos,
};

/* eslint-enable import/no-mutable-exports */