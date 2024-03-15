const logout = document.getElementById("logout");

function checkLoggedUser() {
  if (!localStorage.getItem("loggedUser")) {
    window.location.href = "./pages/login-signup.html";
  }
}

window.addEventListener("beforeunload", (e) => {
  if (!localStorage.getItem("rememberMe")) {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("score");
  }
});

logout.addEventListener("click", () => {
  localStorage.removeItem("loggedUser");

  if (localStorage.getItem("rememberMe"))
    localStorage.removeItem("rememberMe");

  window.location.href = "./pages/login-signup.html";
});

checkLoggedUser();