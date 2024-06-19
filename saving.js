document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    loadTasks();

    addTaskButton.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const task = { text: taskText, completed: false };
            saveTask(task);
            renderTask(task);
            taskInput.value = '';
        }
    }

    function renderTask(task) {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;

        if (task.completed) {
            listItem.classList.add('completed');
        }

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            listItem.classList.toggle('completed');
            task.completed = !task.completed;
            saveTasks();
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            listItem.remove();
            deleteTask(task);
        });

        listItem.appendChild(completeButton);
        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
    }

    function saveTask(task) {
        const tasks = getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function saveTasks() {
        const tasks = Array.from(taskList.children).map(li => ({
            text: li.firstChild.textContent,
            completed: li.classList.contains('completed')
        }));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function deleteTask(task) {
        const tasks = getTasks();
        const updatedTasks = tasks.filter(t => t.text !== task.text);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    function loadTasks() {
        const tasks = getTasks();
        tasks.forEach(renderTask);
    }
});
