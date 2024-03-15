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

const addTodo = async (title, userId) => {
    try {
        const userData = new FormData();

        userData.append("title", title);
        userData.append("user_id", userId);

        const { data } = await axios.post("http://localhost/todolist_backend/create_todo.php", userData);

        //loadTodos();
        console.log(data);
    } catch (error) {
      console.log(error);
    }
};

const userId = parseInt(localStorage.getItem('loggedUser'));

let todosList = getTodos();
