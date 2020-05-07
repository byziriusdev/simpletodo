loadEvents();

function loadEvents() {
    // groups all events the app is gonna listen to
    document.querySelector('form').addEventListener('submit', submit);
    document.getElementById('clear').addEventListener('click', clearTasksboard);
    document.querySelector('ul').addEventListener('click', deleteOrTick);
}

function submit(e) {
    e.preventDefault();

    let input = document.querySelector('input');

    if(input.value != '') addTask(input.value);

    input.value = '';
}

function addTask(task) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    li.innerHTML = `<span class="delete">Del</span><input type="checkbox"><label>${task}</label>`;

    ul.appendChild(li);
}

function clearTasksboard(e) {
    let ul = document.querySelector('ul').innerHTML = '';
}

function deleteOrTick(e) {
    if(e.target.className == 'delete') deleteTask(e);
    else { tickTask(e) }
}

function deleteTask(e) {
    // parent node of a .delete element is a li
    let task = e.target.parentNode;
    // parent node of the task (li element) is ul
    let taskList = task.parentNode;
    taskList.removeChild(task);
}

function tickTask(e) {
    // next sibling of checkbox is the task label
    const taskLabel = e.target.nextSibling;
    if(e.target.checked) {
        taskLabel.classList.add('task-checked');
    } else {
        taskLabel.classList.remove('task-checked');
    }

}