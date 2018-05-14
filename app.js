

// define ui variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();



function loadEventListeners () {
  // Add task event
  form.addEventListener('submit', addTask);
  //remove task event
  taskList.addEventListener('click', removeTask);
  //clear task event
  clearBtn.addEventListener('click', clearTask);
  //filter task event
  filter.addEventListener('keyup', filtertask);
  //DOM load event
  document.addEventListener('DOMContentLoaded', getTask)
}

function getTask () {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }
  tasks.forEach(task => {
    // create li element
    const li = document.createElement('li')
    li.className = 'collection-item';

    // Create text node and append to li
    li.appendChild(document.createTextNode(task));

    // Create a new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //Append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
  })
}

function addTask (e) {
  e.preventDefault();
  if (taskInput.value === '') {
    alert('Add a task')
  }

  // create li element
  const li = document.createElement('li')
  li.className = 'collection-item';

  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));

  // Create a new link element
  const link = document.createElement('a');
  link.className = 'delete-item secondary-content';
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //Append the link to li
  li.appendChild(link);

  //Append li to ul
  taskList.appendChild(li);

  //store in local storage
  storeTaskLocalStorage(taskInput.value);

  //Clear input
  taskInput.value = '';

}

//remove task
function removeTask (e) {
  if (e.target.className === 'fa fa-remove') {
    const li = e.target.parentNode.parentNode;
    li.remove(li)
    //remove from localstorage
    removeTaskFromLocalStorage(li);
  }
}

function removeTaskFromLocalStorage (taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear task
function clearTask () {
  if (confirm('Are you sure?')) {
    taskList.innerHTML = '';
  }
  clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage () {
  localStorage.clear();
}

//filter task
function filtertask (e) {
  const text = e.target.value.toLowerCase();
  const li = document.querySelectorAll('.collection-item');
  li.forEach((task) => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    }
    else {
      task.style.display = 'none';
    }
  })
}


//store in local storage
function storeTaskLocalStorage (task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'))
  }

  tasks.push(task)

  localStorage.setItem('tasks', JSON.stringify(tasks))
}