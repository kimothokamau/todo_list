/* eslint no-use-before-define: ["error", { "variables": false }] */

import {
  dragStart, dragOver, dragLeave, dragEnd, drop, reOrder,
} from './dragdrop.js';

import {
  createTodos, updateTodos, todoslocal,
} from './backend.js';

const displayTodos = (todos) => {
  const ul = document.querySelector('ul');
  const today = () => {
    const todayCont = document.createElement('li');
    todayCont.id = 'today-cont';

    const todayDesc = document.createElement('p');
    todayDesc.textContent = 'Todays ToDos';

    todayCont.appendChild(todayDesc);

    const sync = document.createElement('i');
    sync.classList.add('fas', 'fa-sync-alt');
    sync.classList.add('icons');
    todayCont.appendChild(sync);

    return todayCont;
  };

  ul.appendChild(today());

  const addTodo = () => {
    const newTodoCont = document.createElement('li');
    newTodoCont.id = 'newTodoCont';
    // newTodoCont.setAttribute('id', 'newtodo');

    const todoText = document.createElement('input');
    todoText.type = 'text';
    todoText.placeholder = 'Add to your list...';
    todoText.id = 'todo-text';
    todoText.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        createTodos(todoText.value);
        ul.appendChild(todoItem(todos[todos.length - 1]));

        const clear = document.getElementById('clear');
        ul.appendChild(clear);

        todoText.value = '';
      }
    });

    newTodoCont.appendChild(todoText);

    return newTodoCont;
  };

  const todoItem = (todo) => {
    const todoLi = document.createElement('li');
    todoLi.setAttribute('todo', todo.index);
    todoLi.classList.add('todoli');
    todoLi.classList.add('draggable');
    todoLi.draggable = true;

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('completed');
    checkbox.name = 'completed';
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        const { index } = todo;
        todos[index].completed = true;

        todoslocal();
      } else {
        const { index } = todo;
        todos[index].completed = false;
        todoslocal();
      }
    });

    const todoDesc = document.createElement('span');
    todoDesc.classList.add('description');
    todoDesc.contentEditable = 'true';
    todoDesc.textContent = todo.description;
    todoDesc.addEventListener('input', () => updateTodos(parseInt(todoLi.getAttribute('todo'), 10), todoDesc.textContent));

    todoLi.appendChild(checkbox);
    todoLi.appendChild(todoDesc);

    const delIcon = document.createElement('i');
    delIcon.classList.add('fas', 'fa-trash-alt');
    delIcon.classList.add('icons');
    delIcon.setAttribute('id', 'trash-icon');
    delIcon.addEventListener('click', () => {
      ul.removeChild(todoLi);
      localStorage.clear();
      reOrder();
    });

    todoLi.addEventListener('dragstart', () => dragStart(todoLi));

    todoLi.addEventListener('dragover', (e) => dragOver(todoLi, e));

    todoLi.addEventListener('dragLeave', () => dragLeave(todoLi));

    todoLi.addEventListener('drop', () => drop(todoLi));

    todoLi.addEventListener('dragend', () => dragEnd(todoLi));
    todoLi.appendChild(delIcon);
    return todoLi;
  };

  const clearCompleted = () => {
    const li = document.createElement('li');

    li.textContent = 'Clear all completed';
    li.id = 'clear';
    li.addEventListener('click', () => {
      const draggables = [...document.querySelectorAll('.draggable')];

      const newList = draggables.filter((draggable) => draggable.getElementsByClassName('completed')[0].checked === false);

      draggables.forEach((draggable) => ul.removeChild(draggable));

      newList.forEach((item) => ul.appendChild(item));

      reOrder();

      const clear = document.getElementById('clear');
      ul.appendChild(clear);
    });

    return li;
  };

  ul.appendChild(addTodo());

  todos.sort((a, b) => ((a.index > b.index) ? 1 : -1));
  todos.forEach((todo) => ul.appendChild(todoItem(todo)));

  ul.appendChild(clearCompleted());
};

export default displayTodos;