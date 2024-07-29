let tasks = [];

function addTask() {
    const taskName = document.getElementById('taskName').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;

    if (taskName && startTime && endTime) {
        tasks.push({ taskName, startTime, endTime });
        tasks.sort((a, b) => a.startTime.localeCompare(b.startTime));
        displayTasks();
        clearInputs();
    }
}

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.textContent = `${task.taskName} - Início: ${task.startTime} - Término: ${task.endTime}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remover';
        removeButton.onclick = () => removeTask(index);
        li.appendChild(removeButton);
        taskList.appendChild(li);
    });
}

function clearInputs() {
    document.getElementById('taskName').value = '';
    document.getElementById('startTime').value = '';
    document.getElementById('endTime').value = '';
}

function removeTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const pivotIndex = partition(arr, left, right);
        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
    }
}

function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left - 1;
    for (let j = left; j < right; j++) {
        if (arr[j].endTime.localeCompare(pivot.endTime) < 0) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
    return i + 1;
}

function sortTasksByEndTime() {
    quickSort(tasks);
    displayTasks();
};
