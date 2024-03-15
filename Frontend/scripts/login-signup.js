const loginBox = document.getElementById('login-box');
const signupBox = document.getElementById('signup-box');
const signupLink = document.getElementById('signup-link');
const loginLink = document.getElementById('login-link');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const rememberMe = document.getElementById('remember-me');
const user = document.getElementById('user');
const password = document.getElementById('password');
const incorrectCredNote = document.getElementById('incorrect-credentials-note');
const usernameInput = document.getElementById('username');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const newPasswordInput = document.getElementById('new-password');
const confirmPasswordInput = document.getElementById('confirm-password');
const successNote = document.getElementById('success-note');
const requiredNote = document.getElementById('required-note');
const userNote = document.getElementById('user-note');
const emailNote = document.getElementById('email-note');
const passwordNote = document.getElementById('password-note');




const login = async (user, password) => {
    try {
        const userData = new FormData();

        userData.append("user", user);
        userData.append("password", password);

        const { data } = await axios.post("http://localhost/todolist_backend/login.php", userData);
  
        return data;
    } catch (error) {
      console.log(error);
    }
};
  
const signup = async (username, name, email, password) => {
    const userData = new FormData();

    userData.append("username", username);
    userData.append("name", name);
    userData.append("email", email);
    userData.append("password", password);

    const { data } = await axios.post("http://localhost/todolist_backend/signup.php", userData);

    console.log(JSON.stringify(data));
    return data;
};



const validateEmail = (email) => {
    const regex = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)$/;
    return regex.test(email);
}

loginBtn.addEventListener('click', async () => {
    incorrectCredNote.classList.add('hidden');

    const result = await login(user.value, password.value);

    if (result['status'] === 'invalid') {
        incorrectCredNote.classList.remove('hidden');
        return;
    }

    localStorage.setItem('loggedUser', result['user_id']);
    localStorage.setItem('score', result['score']);

    if (rememberMe.checked)
        localStorage.setItem('rememberMe', 'yes');
    
    window.location.href = '../index.html';
});


signupBtn.addEventListener('click', async () => {
    successNote.classList.add('hidden');
    requiredNote.classList.add('hidden');
    userNote.classList.add('hidden');
    emailNote.classList.add('hidden');
    passwordNote.classList.add('hidden');

    const username = usernameInput.value;
    const name = nameInput.value;
    const email = emailInput.value;
    const newPassword = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (username === '' || name === '' || email === '' || newPassword === '' || confirmPassword === '') {
        requiredNote.classList.remove('hidden');
        return;
    }

    if (!validateEmail(email)) {
        emailNote.classList.remove('hidden');
        return;
    }

    const result = await signup(username, name, email, newPassword);

    if (result['status'] === 'user already exists') {
        userNote.classList.remove('hidden');
        return;
    }

    if (newPassword !== confirmPassword) {
        passwordNote.classList.remove('hidden');
        return;
    }

    successNote.classList.remove('hidden');
});


signupLink.addEventListener('click', () => {
    signupBox.classList.remove('hidden');
    loginBox.classList.add('hidden');
});


loginLink.addEventListener('click', () => {
    loginBox.classList.remove('hidden');
    signupBox.classList.add('hidden');
});