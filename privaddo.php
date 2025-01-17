<?php
// Credenciais válidas
$valid_username = "Simo Gallagher De Luca";
$valid_password = "Hippoampere";

// Receber dados do formulário
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

// Verificar credenciais
if ($username === $valid_username && $password === $valid_password) {
    // Redirecionar para a página de glitch
    header("Location: glitch.html");
    exit();
} else {
    // Mensagem de erro e redirecionamento de volta ao login
    echo "<script>alert('Invalid credentials!'); window.location.href='index.html';</script>";
    exit();
}
?>
