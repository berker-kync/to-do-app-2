const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <div class="checkbox-container">
        <input type="checkbox" class="task-checkbox">
      </div>
      <div class="task-container">
        <span class="task-text">${taskText}</span>
        <input type="text" class="edit-input" style="display: none;">
      </div>
      <div class="button-container">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
    taskInput.value = '';

    const deleteButton = li.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      li.remove();
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

    taskCheckbox.addEventListener('change', () => {
      if (taskCheckbox.checked) {
        taskTextElement.style.textDecoration = 'line-through';
        li.style.backgroundColor = '#d3d3d3';
      } else {
        taskTextElement.style.textDecoration = 'none';
        li.style.backgroundColor = '';
      }
    });
  }
});
