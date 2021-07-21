const displayTodos = (todos) => {
  const today = () => {
    const todayCont = document.createElement('li');
    todayCont.id = 'today-cont';

    const todayDesc = document.createElement('p');
    todayDesc.textContent = 'Todays ToDos';

    todayCont.appendChild(todayDesc);

    return todayCont;
  };

  const addTodo = () => {
    const newTodoCont = document.createElement('li');
    newTodoCont.id = 'newTodoCont';

    const todoText = document.createElement('input');
    todoText.type = 'text';
    todoText.placeholder = 'Add to your list...';
    todoText.className = 'todo-text';

    newTodoCont.appendChild(todoText);
    return newTodoCont;
  };

  const todoItem = (todo) => {
    const todoLi = document.createElement('li');
    todoLi.setAttribute('todo', todo.index);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('checkbox');

    const todoDesc = document.createElement('span');
    todoDesc.classList.add('description');
    todoDesc.textContent = todo.description;

    todoLi.appendChild(checkbox);
    todoLi.appendChild(todoDesc);
    return todoLi;
  };

  const ul = document.querySelector('ul');
  ul.appendChild(today());
  ul.appendChild(addTodo());

  todos.sort((a, b) => ((a.index > b.index) ? 1 : -1));
  todos.forEach((todo) => ul.appendChild(todoItem(todo)));
};

export default displayTodos;