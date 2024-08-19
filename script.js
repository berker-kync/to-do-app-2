const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const archiveList = document.getElementById('archiveList');
const dueDateInput = document.getElementById('dueDateInput');
const dueTimeInput = document.getElementById('dueTimeInput');

let draggedItem = null;

addButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const dueTime = dueTimeInput.value;

  if (taskText !== '') {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.draggable = true;
    li.innerHTML = `
      <div class="checkbox-container">
        <span>Checked?</span>
        <input type="checkbox" class="task-checkbox">
      </div>
      <div class="task-container">
        <span class="task-text">${taskText}</span>
        <div class="due-date-time">
          <span>${dueDate} ${dueTime}</span>
        </div>
        <input type="text" class="edit-input" style="display: none;">
      </div>
      <div class="button-container">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
    dueDateInput.value = '';
    dueTimeInput.value = '';

    const deleteButton = li.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      archiveTask(li);
    });

    const editButton = li.querySelector('.edit-btn');
    const editInput = li.querySelector('.edit-input');
    const taskTextElement = li.querySelector('.task-text');
    const taskCheckbox = li.querySelector('.task-checkbox');

    editButton.addEventListener('click', () => {
      editInput.value = taskTextElement.textContent;
      editInput.style.display = 'inline';
      taskTextElement.style.display = 'none';
      editInput.focus();
    });

    editInput.addEventListener('blur', () => {
      taskTextElement.textContent = editInput.value;
      editInput.style.display = 'none';
      taskTextElement.style.display = 'inline';
    });

    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        editInput.blur();
      }
    });

    // Drag drop functionality
    li.addEventListener('dragstart', () => {
      draggedItem = li;
      setTimeout(() => {
        li.style.display = 'none';
      }, 0);
    });

    li.addEventListener('dragend', () => {
      setTimeout(() => {
        li.style.display = 'flex';
        draggedItem = null;
      }, 0);
    });

    li.addEventListener('dragover', (e) => {
      e.preventDefault();
    });

    li.addEventListener('dragenter', (e) => {
      e.preventDefault();
      li.style.border = '2px dashed #ccc';
    });

    li.addEventListener('dragleave', () => {
      li.style.border = 'none';
    });

    li.addEventListener('drop', () => {
      li.style.border = 'none';
      taskList.insertBefore(draggedItem, li);
    });
  }
});

function archiveTask(taskItem) {
  taskItem.classList.add('archived-task'); 
  archiveList.appendChild(taskItem);

  const restoreButton = document.createElement('button');
  restoreButton.textContent = 'restore';
  restoreButton.className = 'restore-btn';

  const buttonContainer = taskItem.querySelector('.button-container');
  buttonContainer.innerHTML = ''; 

  buttonContainer.appendChild(restoreButton);

  restoreButton.addEventListener('click', () => {
    taskList.appendChild(taskItem);
    taskItem.classList.remove('archived-task');
    buttonContainer.innerHTML = `
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    `;

    const deleteButton = buttonContainer.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      archiveTask(taskItem);
    });

    const editButton = buttonContainer.querySelector('.edit-btn');
    const editInput = taskItem.querySelector('.edit-input');
    const taskTextElement = taskItem.querySelector('.task-text');

    editButton.addEventListener('click', () => {
      editInput.value = taskTextElement.textContent;
      editInput.style.display = 'inline';
      taskTextElement.style.display = 'none';
      editInput.focus();
    });

    editInput.addEventListener('blur', () => {
      taskTextElement.textContent = editInput.value;
      editInput.style.display = 'none';
      taskTextElement.style.display = 'inline';
    });

    editInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        editInput.blur();
      }
    });
  });
}
