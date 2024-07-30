const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

addButton.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox">
      ${taskText}
      <button class="delete-btn">Delete</button>
    `;
    taskList.appendChild(li);
    taskInput.value = '';

    const deleteButton = li.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      li.remove();
    });
  }
});
