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






loginBtn.addEventListener('click', async () => {
    incorrectCredNote.classList.add('hidden');

    const loginResult = await login(user.value, password.value);
    if (loginResult['status'] === 'invalid') {
        incorrectCredNote.classList.remove('hidden');
        return;
    }

    localStorage.setItem('loggedUser', loginResult['user_id']);
    localStorage.setItem('score', loginResult['score']);

    if (rememberMe.checked)
        localStorage.setItem('rememberMe', 'yes');
    
    window.location.href = '../index.html';
});

signupBtn.addEventListener('click', async () => {

});

signupLink.addEventListener('click', () => {
    signupBox.classList.remove('hidden');
    loginBox.classList.add('hidden');
});

loginLink.addEventListener('click', () => {
    loginBox.classList.remove('hidden');
    signupBox.classList.add('hidden');
});