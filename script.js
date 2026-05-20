const list = document.getElementById('todo-list');
const itemCountSpan = document.getElementById('item-count');
const uncheckedCountSpan = document.getElementById('unchecked-count');

let currentTheme = localStorage.getItem('todo_theme') || 'light';
document.documentElement.setAttribute('data-bs-theme', currentTheme);

const themeBtn = document.createElement('button');
themeBtn.className = currentTheme === 'dark' ? 'btn btn-light ms-2 mb-3' : 'btn btn-secondary ms-2 mb-3';
themeBtn.textContent = currentTheme === 'dark' ? 'Світла тема' : 'Темна тема';

themeBtn.onclick = function() {
  currentTheme = currentTheme === 'light' ? 'dark' : 'light';
  localStorage.setItem('todo_theme', currentTheme);
  document.documentElement.setAttribute('data-bs-theme', currentTheme);
  themeBtn.className = currentTheme === 'dark' ? 'btn btn-light ms-2 mb-3' : 'btn btn-secondary ms-2 mb-3';
  themeBtn.textContent = currentTheme === 'dark' ? 'Світла тема' : 'Темна тема';
};
const newTodoBtn = document.querySelector('button.btn-primary');
newTodoBtn.parentNode.insertBefore(themeBtn, newTodoBtn.nextSibling);
const savedTodos = localStorage.getItem('todo_app_data');

let todos = savedTodos ? JSON.parse(savedTodos) : [
  { id: 1, text: "Вивчити HTML", isChecked: true },
  { id: 2, text: "Вивчити CSS", isChecked: true },
  { id: 3, text: "Вивчити JavaScript", isChecked: false }
];

function saveTodos() {
  localStorage.setItem('todo_app_data', JSON.stringify(todos));
}

function newTodo() {
  const taskText = prompt("Введіть нове завдання:");

  if (taskText && taskText.trim() !== "") {
    const newId = Date.now(); 
    
    todos.push({
      id: newId,
      text: taskText.trim(),
      isChecked: false
    });

    saveTodos();
    render(todos);
    updateCounter();
  }
}

function renderTodo(todo) {
  const isCheckedAttr = todo.isChecked ? 'checked' : '';
  const textClass = todo.isChecked ? 'text-success text-decoration-line-through' : '';

  return `
    <li class="list-group-item">
      <input type="checkbox" class="form-check-input me-2" id="${todo.id}" ${isCheckedAttr} onChange="checkTodo(${todo.id})" />
      <label for="${todo.id}"><span class="${textClass}">${todo.text}</span></label>
      <button class="btn btn-danger btn-sm float-end" onClick="deleteTodo(${todo.id})">delete</button>
    </li>
  `;
}

function render(todosArray) {
  const htmlStrings = todosArray.map(todo => renderTodo(todo));
  list.innerHTML = htmlStrings.join('');
}

function updateCounter() {
  itemCountSpan.textContent = todos.length;
  const uncheckedTodos = todos.filter(todo => !todo.isChecked);
  uncheckedCountSpan.textContent = uncheckedTodos.length;
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  
  saveTodos();
  render(todos);
  updateCounter();
}

function checkTodo(id) {
  const todo = todos.find(todo => todo.id === id);
  
  if (todo) {
    todo.isChecked = !todo.isChecked; 
  }
  
  saveTodos();
  render(todos);
  updateCounter();
}
render(todos);
updateCounter();