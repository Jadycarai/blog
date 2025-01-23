// Credenciais válidas
const validUsername = "Simo Gallagher De Luca";
const validPassword = "Hippoampere";

// Formulário
const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Evita recarregar a página

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === validUsername && password === validPassword) {
    window.location.href = "https://seu-dominio-ou-site-destino.com"; // Redireciona ao site
  } else {
    errorMessage.classList.remove("hidden"); // Mostra mensagem de erro
  }
});
