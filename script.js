// Selectors
const taskInput = document.querySelector('.task-input');
const taskButton = document.querySelector('.task-btn');
const selections = document.querySelector('.selections');
const taskList = document.querySelector('.task-list');

// Event Listeners
if(document.readyState !== 'loading') {
    getTasks();
} else {
    document.addEventListener('DOMContentLoaded', function () {
        getTasks();
    });
}
taskButton.addEventListener('click', addTask);
taskList.addEventListener('click', deleteComplete);
selections.addEventListener('change', selection);

// Functions
function addTask(event) {
       event.preventDefault(); 

       if (taskInput.value === "") {
    } else {

        if (duplicateTaskCheck(taskInput.value) != 'duplicate') {

           const taskDiv = document.createElement('div');
           taskDiv.classList.add('task');

           const newTask = document.createElement('li');
           newTask.innerText = taskInput.value;
           newTask.classList.add('task-item');
           taskDiv.appendChild(newTask);

           saveLocalTasks(taskInput.value);

           const completedButton = document.createElement('button');
           completedButton.innerHTML = '<i class="fas fa-check"></i>';
           completedButton.classList.add('complete-btn');
           taskDiv.appendChild(completedButton);

           const deletedButton = document.createElement('button');
           deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
           deletedButton.classList.add('delete-btn');
           taskDiv.appendChild(deletedButton);

           taskList.appendChild(taskDiv);
           taskInput.value = "";
        }
    }
}

function deleteComplete(e) {
    const item = e.target;
    if (item.classList[0] === 'delete-btn') {
        const task = item.parentElement;
        task.classList.add('delete-animation');
        removeLocalTasks(task);
        task.addEventListener('transitionend', function() {
            task.remove();
        });
    }

    if (item.classList[0] === 'complete-btn') {
        const task = item.parentElement;
        task.classList.toggle('completed');
        markCompleted(task);
    }
}

function selection(e) {
    const tasks = taskList.childNodes;
    tasks.forEach(function(task) {
        switch(e.target.value) {
            case "all":
                task.style.display = 'flex';
                break;
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
            case 'notcompleted':
                if (!task.classList.contains('completed')) {
                    task.style.display = 'flex';
                } else {
                    task.style.display = 'none';
                }
                break;
        }
    });
        
}

function saveLocalTasks(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    let data = {
        task: task,
        status: 'notcompleted'
    };
    tasks.push(data);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task) {

        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        const newTask = document.createElement('li');
        newTask.innerText = task['task'];
        newTask.classList.add('task-item');
        taskDiv.appendChild(newTask);

        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        taskDiv.appendChild(completedButton);

        const deletedButton = document.createElement('button');
        deletedButton.innerHTML = '<i class="fas fa-trash"></i>';
        deletedButton.classList.add('delete-btn');
        taskDiv.appendChild(deletedButton);

        taskList.appendChild(taskDiv);
        let status = task.status;
        if (status === 'completed') {
            taskDiv.classList.toggle('completed');
        }
    });
}

function removeLocalTasks(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse (localStorage.getItem('tasks'));
    }
    const taskIndex = task.children[0].innerText;
    let index = tasks.findIndex(obj => obj.task == taskIndex);
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function duplicateTaskCheck(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['task'] === task) {
            return 'duplicate';
        }
    }
}

function markCompleted(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    const taskIndex = task.children[0].innerText;
    let index = tasks.findIndex(obj => obj.task == taskIndex);
    if (tasks[index].status === 'notcompleted') {
        tasks[index].status = 'completed';
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
        tasks[index].status = 'notcompleted';
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

