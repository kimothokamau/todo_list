const reOrder = () => {
  const draggable_elems = document.querySelectorAll('.draggable');

  let i = 0;
  draggable_elems.forEach((draggable_elem) => {
    draggable_elem.setAttribute('todo', i);
    i += 1;
  });

}

const dragStart = (e) => {
  e.dataTransfer.setData('text/plain', e.target.id);
  setTimeout(() => {
      e.target.classList.add('hide');
  }, 0);

}


const dragEnter = (e) => {
  e.preventDefault();
  e.classList.add('drag-over');
}

const dragOver = (e) => {
  e.preventDefault();
  e.target.classList.add('drag-over');
}

const dragLeave = (e) => {
  e.target.classList.remove('drag-over');
}

const drop = (e) => {
  e.target.classList.remove('drag-over');

  const id = e.dataTransfer.getData('text/plain');
  const draggable = document.getElementById(id);

  //Add it to the drop target
  e.target.appendChild(draggable);

  // display the draggable element
  draggable.classList.remove('hide');
}

const dragEnd = (e) => {
  e.target.classList.remove('drag-over');
}

export { reOrder, dragStart, dragEnter, dragOver, dragLeave, drop, dragEnd };