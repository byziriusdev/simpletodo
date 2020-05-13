initLocalStorage();
loadEvents();

function loadEvents() {
    // groups all events the app is gonna listen to
    document.querySelector('form').addEventListener('submit', submit);
    document.getElementById('clear').addEventListener('click', clearTasksboard);
    document.querySelector('ul').addEventListener('click', deleteOrTick);
}

function initLocalStorage() {
    // maybe I also should check if I can dispose of localStorage in the browser
    if (localStorage.getItem('tasks') == null)
        // init localStorage item tasks if doesnt exists yet with an array
        localStorage.setItem('tasks', "[]");

    // load tasks
    fillTasksboard();
}

function fillTasksboard() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));

    showNoTasksMessage(tasks.length < 1);

    for(var i = 0; i < tasks.length; i++) {
        addTaskDOM(tasks[i], i);
    }
}

function submit(e) {
    e.preventDefault();

    let input = document.querySelector('input');

    if(input.value != '') addTask(input.value);

    input.value = '';
}

function addTask(taskText) {
    let task = {
        text: taskText,
        checked: 0
    }
    
    let lsTasks = JSON.parse(localStorage.getItem('tasks'));
        lsTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(lsTasks));
    
    let taskIndex = lsTasks.length - 1;

    showNoTasksMessage(lsTasks.length < 1);

    addTaskDOM(task, taskIndex);
}

function addTaskDOM(task, taskIndex) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    li.innerHTML = 
    `<input type="hidden" value="${taskIndex}">
    <span class="delete"></span>
    <label class="custom-checkbox">
        <input type="checkbox">
        <span class="checkmark"></span>
    </label>
    <div class="taskText"><span>${task.text}</span></div>`;
    
    if(task.checked) {
        li.querySelector('div').querySelector('span').classList.add('task-checked');
        li.querySelector('input[type="checkbox"]').checked = true;
    }

    ul.appendChild(li);
}

function clearTasksboardDOM() {
    let ul = document.querySelector('ul').innerHTML = '';
}

function clearTasksboard(e) {
    localStorage.setItem('tasks', "[]");
    showNoTasksMessage(true);
    clearTasksboardDOM();
}

function deleteOrTick(e) {
    if(e.target.className == 'delete') deleteTask(e);
    else { tickTask(e) }
}

function deleteTask(e) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    // parent node of a .delete element is a li
    let task = e.target.parentNode;
    let taskIndex = task.querySelector('input[type="hidden"]').value;

    tasks.splice(taskIndex, 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    
    clearTasksboardDOM();

    fillTasksboard();

    // parent node of the task (li element) is ul
    //let taskList = task.parentNode;
    //taskList.removeChild(task);
}

function tickTask(e) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    // task is the label
    const task  =  e.target.parentNode;

    // here task.parentNode would be the li element
    const taskIndex = task.parentNode.querySelector('input[type="hidden"]').value;

    
    // 
    let taskLabel = task.parentNode.querySelector('div').querySelector('span');

    if(e.target.checked) {
        taskLabel.classList.add('task-checked');
        tasks[taskIndex].checked = 1;
    } else {
        taskLabel.classList.remove('task-checked');
        tasks[taskIndex].checked = 0;
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function showNoTasksMessage(bool) {
    if(bool) {
        document.querySelector('p').style.display = "block";
    } else {
        document.querySelector('p').style.display = "none";
    }
}