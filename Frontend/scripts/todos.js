const getTodos = async () => {
    try {
        const userData = new FormData();

        userData.append("user_id", userId);

        const { data } = await axios.post("http://localhost/todolist_backend/read_todos.php", userData);

        const todos = data['todos'];

        return todos;
    } catch (error) {
        console.log(error);
    }
}

const getTodo = (id) => {
    const found = todosList.find((todo) => id === todo['todo_id']);
  
    return found;
};

const addTodo = async (title, userId) => {
    try {
        const userData = new FormData();

        userData.append("title", title);
        userData.append("user_id", userId);

        const { data } = await axios.post("http://localhost/todolist_backend/create_todo.php", userData);

        loadTodosInList();
        addNote.classList.remove('hidden');
    } catch (error) {
      console.log(error);
    }
};

const updateTodo = async (editingTitle, id, title, completed) => {
    try {
        const userData = new FormData();

        userData.append("todo_id", id);
        userData.append("title", title);
        userData.append("completed", completed);

        const { data } = await axios.post("http://localhost/todolist_backend/update_todo.php", userData);

        loadTodosInList();

        if (editingTitle) editNote.classList.remove('hidden');
        console.log(id);
        
    } catch (error) {
      console.log(error);
    }
};

const deleteTodo = async (id) => {
    try {
        const userData = new FormData();

        userData.append("todo_id", id);

        const { data } = await axios.post("http://localhost/todolist_backend/delete_todo.php", userData);

        loadTodosInList();
    } catch (error) {
      console.log(error);
    }
};

const userId = parseInt(localStorage.getItem('loggedUser'));

let todosList = [];
