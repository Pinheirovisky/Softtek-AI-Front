const API_URL = "http://localhost:8080/api/auth";

// Função para verificar se o usuário está autenticado
function isAuthenticated() {
  const token = localStorage.getItem("authToken");
  return token !== null; // Retorna true se o token existir, ou false caso contrário
}

// Redireciona para a página de login se o usuário não estiver autenticado
function redirectToLogin() {
  const path = window.location.pathname;

  // Verifica se o usuário não está autenticado
  if (!isAuthenticated()) {
    // Redireciona para a página de login se não estiver na página de login
    if (path !== "/Login.html" && path !== "/index.html") {
      window.location.href = "/Login.html";
    }
  } else {
    // Se o usuário estiver autenticado, evita redirecionar se já estiver na página inicial
    if (path === "/Login.html") {
      window.location.href = "/index.html";
    }
  }
}

// Função para enviar a request de login ao backend
async function login() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Erro ao tentar fazer login");
    }

    const data = await response.json();
    const token = data.token;

    // Armazena o token no localStorage
    localStorage.setItem("authToken", token);

    // Redireciona para a página inicial ou outra página
    window.location.href = "index.html";
  } catch (error) {
    console.error("Erro:", error);
    alert("Falha no login. Por favor, tente novamente.");
  }
}

// Função para logout
function handleLogout() {
  // Remove o token de autenticação do localStorage
  localStorage.removeItem("authToken");

  // Redireciona o usuário para a página de login
  window.location.href = "/Login.html";
}

// Verifica e redireciona se necessário ao carregar a página
redirectToLogin();

document.addEventListener("DOMContentLoaded", function () {
  // Adiciona o evento de clique ao botão "Sair"
  const logoutButton = document.getElementById("logoutButton");
  if (logoutButton) {
    logoutButton.addEventListener("click", function (event) {
      event.preventDefault(); // Previne o comportamento padrão do link
      handleLogout(); // Chama a função de logout
    });
  }

  // Adiciona o evento de clique ao botão de login
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", login);
  }

  // Verifica e redireciona se necessário ao carregar a página
  redirectToLogin();
});
