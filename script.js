const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="checkbox-container">
        <input type="checkbox">
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

    editButton.addEventListener('click', () => {
      editInput.value = taskTextElement.textContent;
      editInput.style.display = 'block';
      taskTextElement.style.display = 'none';
    });

    editInput.addEventListener('blur', () => {
      taskTextElement.textContent = editInput.value;
      editInput.style.display = 'none';
      taskTextElement.style.display = 'block';
    });
  }
});
