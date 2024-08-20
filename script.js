document.addEventListener('DOMContentLoaded', loadTodos);

document.getElementById('add-todo').addEventListener('click', function() {
    addTodo();
});

function addTodo() {
    let todoInput = document.getElementById('todo-input');
    let todoText = todoInput.value;

    if (todoText === '') {
        alert('Tolong masukkan list!!!!!!');
        return;
    }

    let li = createTodoElement(todoText);

    document.getElementById('todo-list').appendChild(li);
    saveTodoToLocalStorage(todoText, false);

    todoInput.value = '';
}

function createTodoElement(todoText, completed = false) {
    let li = document.createElement('li');
    if (completed) li.classList.add('completed');

    let checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', function() {
        if (this.checked) {
            li.classList.add('completed');
        } else {
            li.classList.remove('completed');
        }
        updateTodoInLocalStorage(todoText, this.checked);
    });

    let span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todoText;

    let dateSpan = document.createElement('span');
    dateSpan.className = 'date';
    let currentDate = new Date().toLocaleDateString();
    dateSpan.textContent = currentDate;

    let deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.className = 'delete';
    deleteButton.addEventListener('click', function() {
        deleteTodoFromLocalStorage(todoText);
        this.parentElement.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(dateSpan);
    li.appendChild(deleteButton);

    return li;
}

function saveTodoToLocalStorage(todoText, completed) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text: todoText, completed: completed });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateTodoInLocalStorage(todoText, completed) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        if (todo.text === todoText) {
            todo.completed = completed;
        }
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function deleteTodoFromLocalStorage(todoText) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos = todos.filter(todo => todo.text !== todoText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function loadTodos() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => {
        let li = createTodoElement(todo.text, todo.completed);
        document.getElementById('todo-list').appendChild(li);
    });
}