

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

  //Clear input
  taskInput.value = '';

}

//remove task
function removeTask (e) {
  if (e.target.className === 'fa fa-remove') {
    const li = e.target.parentNode.parentNode;
    li.remove(li)
  }
}

//clear task
function clearTask () {
  if (confirm('Are you sure?')) {
    taskList.innerHTML = '';
  }
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