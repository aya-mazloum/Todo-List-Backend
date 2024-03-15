const score = document.getElementById('score');
const addBtn = document.getElementById('add-btn');
const todoInput = document.getElementById('todo-title-input');
const todosContainer = document.getElementById('todos-container');
const addNote = document.getElementById('add-note');
const editNote = document.getElementById('edit-note');




const loadTodosInList = () => {
    addNote.classList.add('hidden');
    editNote.classList.add('hidden');

    let todosListPromise = getTodos();
    todosListPromise.then((loaded) => {
        todosContainer.innerHTML = '';

        todosList = loaded;

        todosList.forEach(todo => {
            todosContainer.innerHTML += generateTodoItem(todo);
        });

        const todoEditBtns = document.querySelectorAll('.edit-todo');

        todoEditBtns.forEach((editBtn) => {
            editBtn.addEventListener('click', () => {
                let todoItems = document.querySelectorAll('.todo-item');
                if (todoItems.length > 0) {
                    todoItems.forEach((item) => {
                        item.classList.remove('editing');
                    });
                }

                const selected = editBtn.parentElement.id;
                const checked = editBtn.parentElement.getAttribute('todo-completed');

                localStorage.setItem('current-todo-id', selected);
                localStorage.setItem('current-todo-status', checked);

                const todo = getTodo(parseInt(selected));

                todoInput.value = todo['title'];

                addBtn.innerHTML = "Edit";
                editBtn.parentElement.classList.add('editing');
            });
        });
    });
};

const generateTodoItem = (todo) => {
    const { todo_id, title, completed } = todo;

    const isChecked = completed == 1 ? 'checked' : '';

    return `<div class="flex row todo-item" id="${todo_id}" todo-completed=${completed}>
                <label>
                    <input type="checkbox" class="todo-done-checkbox" ${isChecked}>${title}
                </label>
                <i class="fa-regular fa-pen-to-square edit-todo"></i>
                <i class="fa-solid fa-trash delete-todo"></i>
            </div>`;
}






addBtn.addEventListener('click', async () => {
    const todoTitle = todoInput.value;

    const idSelected = localStorage.getItem('current-todo-id');
    const completed = localStorage.getItem('current-todo-status');

    if (idSelected) {
        editTodo(idSelected, todoTitle, completed);
        
        addBtn.innerHTML = 'Add';

        localStorage.removeItem('current-todo-id');
        localStorage.removeItem('current-todo-status');

        todoInput.value = '';
    } else {
        addTodo(todoTitle, userId);

        todoInput.value = '';
    }
});

loadTodosInList();

score.innerHTML = localStorage.getItem('score');