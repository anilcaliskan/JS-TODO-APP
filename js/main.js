const todoForm = document.querySelector('#todoForm')
const todoInput = document.querySelector('#todoInput')
const todoItemsList = document.querySelector('#todoItems')

let todos = []

todoForm.addEventListener('submit', function (event) {
    event.preventDefault()
    addTodo(todoInput.value)
});

function addTodo(item) {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        todos.push(todo)
        renderTodos(todos)
        addToLocalStorage(todos)


        todoInput.value = ''
    }
}

function renderTodos(todos) {
    todoItemsList.innerHTML = ''

    todos.forEach(function (item) {
        const checked = item.completed ? 'checked' : null
        const li = document.createElement('li')
        

        li.classList.add('item', 'list-group-item', 'd-flex', 'justify-content-between', 'align-items-center')
        li.setAttribute('data-key', item.id)


        if (item.completed === true) {
            li.classList.add('checked', 'list-group-item-success')
            // document.querySelector('#liChild').innerHTML = ``
        }

        li.innerHTML = `
        <span class="text-capitalize">${item.name} </span>
        <div id="liChild" class="align-items-center">
            <input class="form-check-input" type="checkbox" ${checked}>
            <button type="button" class="deleteButton btn-close" aria-label="Close"></button>
        </div>
        `

        todoItemsList.append(li)
    })
}

function addToLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
    renderTodos(todos)
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('todos')
    if (reference) {
        todos = JSON.parse(reference)
        renderTodos(todos)
    }
}

function toggle(id) {
    todos.forEach(function (item) {
        if (item.id == id) {
            item.completed = !item.completed;
        }
    })

    addToLocalStorage(todos)
}

function deleteTodo(id) {
    todos = todos.filter(function (item) {
        return item.id != id;
    })

    addToLocalStorage(todos);
}

todoItemsList.addEventListener('click', function (event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('deleteButton')) {
        deleteTodo(event.target.parentElement.parentElement.getAttribute('data-key'));
    }
})

getFromLocalStorage()

for (let i = 0; i < todos.length; i++) {
    console.log(todos[i])
}