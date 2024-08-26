document.getElementById("addButton").addEventListener("click", addTask);

function addTask() {
    const taskInput = document.getElementById("taskInput").value;
    const dueDateInput = document.getElementById("dueDateInput").value;
    const dueTimeInput = document.getElementById("dueTimeInput").value;
    const prioritySelect = document.getElementById("prioritySelect").value;

    if (taskInput === "") {
        alert("Please enter a task.");
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.className = "task-item " + prioritySelect;

    const taskText = document.createElement("span");
    taskText.className = "task-text";
    taskText.textContent = taskInput;

    const priorityText = document.createElement("span");
    priorityText.className = "priority-text";
    priorityText.textContent = "Priority: " + capitalizeFirstLetter(prioritySelect);

    const dueDateContainer = document.createElement("div");
    dueDateContainer.className = "due-date-container";
    const dueDate = document.createElement("span");
    dueDate.className = "due-date";
    dueDate.textContent = "Due Date: " + dueDateInput;
    const dueTime = document.createElement("span");
    dueTime.className = "due-time";
    dueTime.textContent = "Due Time: " + dueTimeInput;

    dueDateContainer.appendChild(dueDate);
    dueDateContainer.appendChild(dueTime);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteTask(taskItem));

    taskItem.appendChild(taskText);
    taskItem.appendChild(priorityText); 
    taskItem.appendChild(dueDateContainer);
    taskItem.appendChild(deleteButton);

    document.getElementById("taskList").appendChild(taskItem);

    document.getElementById("taskInput").value = "";
    document.getElementById("dueDateInput").value = "";
    document.getElementById("dueTimeInput").value = "";
    document.getElementById("prioritySelect").value = "low"; 
}

function deleteTask(taskItem) {
    taskItem.classList.add("completed-task");
    setTimeout(() => {
        document.getElementById("archiveList").appendChild(taskItem);
        taskItem.classList.remove("completed-task");
        taskItem.classList.add("archived-task");

        const restoreButton = document.createElement("button");
        restoreButton.className = "restore-btn";
        restoreButton.textContent = "Restore";
        restoreButton.addEventListener("click", () => restoreTask(taskItem));

        taskItem.appendChild(restoreButton);
    }, 1500);
}

function restoreTask(taskItem) {
    taskItem.classList.remove("archived-task");
    document.getElementById("taskList").appendChild(taskItem);
    const restoreButton = taskItem.querySelector(".restore-btn");
    restoreButton.remove();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
