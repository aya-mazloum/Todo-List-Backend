const login = async (user, password) => {
    try {
        const userData = new FormData();

        userData.append("user", user);
        userData.append("password", password);

        const { data } = await axios.post("http://localhost/todolist_backend/login.php", userData);
  
        console.log(JSON.stringify(data));
        return data;
    } catch (error) {
      console.log(error);
    }
  };