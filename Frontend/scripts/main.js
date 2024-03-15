const score = document.getElementById('score');
const addBtn = document.getElementById('submit');
const todoInput = document.getElementById('todo');
const todosContainer = document.getElementById('todos-container');




const loadTodosInList = () => {
    todosList.then((loaded) => {
        todosContainer.innerHTML = '';

        loaded.forEach(todo => {
            todosContainer.innerHTML += generateTodoItem(todo);
        });
    });
};

const generateTodoItem = (todo) => {
    const { id, title, completed } = todo;
    const isChecked = completed == 1 ? 'checked' : '';
    return `<div class="flex row todo-item" id="${id}">
                <label>
                    <input type="checkbox" class="todo-done-checkbox" ${isChecked}>${title}
                </label>
                <i class="fa-regular fa-pen-to-square"></i>
                <i class="fa-solid fa-xmark delete-todo"></i>
            </div>`;
}



score.innerHTML = localStorage.getItem('score');



addBtn.addEventListener('click', async () => {
    const todoTitle = todoInput.value;

    addTodo(todoTitle, userId);


});

loadTodosInList();
