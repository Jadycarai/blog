// Seleciona o botão "Seguir"
const followButton = document.getElementById('followButton');

// Seleciona o botão "Mensagem"
const messageButton = document.getElementById('messageButton');

// Função para o botão "Seguir"
followButton.addEventListener('click', () => {
    alert('Você está seguindo agora!');
    followButton.textContent = 'Seguindo';
    followButton.disabled = true; // Desativa o botão depois de clicar
});

// Função para abrir o modal de mensagens
messageButton.addEventListener('click', () => {
    const messageModal = document.getElementById('messageModal');
    messageModal.style.display = 'block';
});

// Função para fechar o modal
function closeMessageChannel() {
    const messageModal = document.getElementById('messageModal');
    messageModal.style.display = 'none';
}

// Função para enviar mensagem
function sendMessage() {
    const messageInput = document.getElementById('messageInput').value;
    const messageOutput = document.getElementById('messageOutput');
    if (messageInput.trim() !== '') {
        messageOutput.innerHTML += `<p><strong>Você:</strong> ${messageInput}</p>`;
        document.getElementById('messageInput').value = ''; // Limpa o campo de texto
    }
}
