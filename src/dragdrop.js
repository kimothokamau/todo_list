import {addTodos, todoslocal, emptyTodos} from './backend.js';

const reOrder = () => {
  const draggable_elems = document.querySelectorAll('.draggable');

  let i = 0;
  draggable_elems.forEach((draggable_elem) => {
    draggable_elem.setAttribute('todo', i);
    i += 1;
  });
};

const dragStart = (elem) => {
  elem.classList.add('dragging');
};

const dragOver = (elem, e) => {
  e.preventDefault();
  elem.classList.add('drag-over');
};

const dragLeave = (elem) => {
  elem.classList.remove('drag-over');
};

const drop = (elem) => {
  const dragging = document.querySelector('.dragging');
  elem.before(dragging);

  const draggables = document.querySelectorAll('.draggable');

  let i = 0;
  draggables.forEach((draggable) => {
    draggable.setAttribute('todo', i);
    i += 1;
  });

  emptyTodos();
  draggables.forEach((draggable) => {
    const description = draggable.getElementsByClassName('description')[0].textContent;
    const completed = draggable.getElementsByClassName('completed')[0].checked;
    const index = draggable.getAttribute('todo');

    addTodos(description, completed, index);
    todoslocal();
  });


  elem.classList.remove('drag-over');
};

const dragEnd = (elem) => {
  elem.classList.remove('dragging');
};

export {
  reOrder, dragStart, dragOver, dragLeave, drop, dragEnd,
};