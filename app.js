loadEvents();

function loadEvents() {
    // groups all events the app is gonna listen to
    document.querySelector('form').addEventListener('submit', submit);
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