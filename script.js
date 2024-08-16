addButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  const dueDate = document.getElementById('dueDateInput').value;
  const dueTime = document.getElementById('dueTimeInput').value;

  if (taskText !== '') {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.draggable = true;
    li.innerHTML = `
      <div class="checkbox-container">
        <input type="checkbox" class="task-checkbox">
      </div>
      <div class="task-container">
        <span class="task-text">${taskText}</span>
        <div class="due-date-time">${dueDate} ${dueTime}</div>
        <input type="text" class="edit-input" style="display: none;">
      </div>
      <div class="button-container">
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
    document.getElementById('dueDateInput').value = '';
    document.getElementById('dueTimeInput').value = '';

    const deleteButton = li.querySelector('.delete-btn');
    const taskCheckbox = li.querySelector('.task-checkbox');

    deleteButton.addEventListener('click', () => {
      li.classList.add('completed-task'); // Add the fade-out animation
      setTimeout(() => {
        li.remove(); // Remove the task after the animation completes
      }, 1500); // Match the duration of the fade-out animation (1.5s)
    });

    // Checkbox event: No additional functionality, just check/uncheck
    taskCheckbox.addEventListener('change', () => {
      // You can handle any specific behavior here if needed, but currently, nothing happens
    });

    // Edit and drag-and-drop functionality remains unchanged
    const editButton = li.querySelector('.edit-btn');
    const editInput = li.querySelector('.edit-input');
    const taskTextElement = li.querySelector('.task-text');

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
