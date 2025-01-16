// Função para enviar a mensagem do usuário
function sendMessage() {
    const userMessage = document.getElementById('user-message').value;
    if (userMessage.trim() !== "") {
        // Exibe a mensagem do usuário
        displayMessage(userMessage, "user-message");
        
        // Limpa a caixa de texto
        document.getElementById('user-message').value = "";

        // Simula a resposta do Simo
        setTimeout(() => {
            const simoResponse = generateSimoResponse();
            displayMessage(simoResponse, "simo-message");
        }, 1000); // Resposta de Simo após 1 segundo
    }
}

// Função para exibir uma mensagem no chat
function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Rolagem para a última mensagem
}

// Função para gerar respostas automáticas do Simo
function generateSimoResponse() {
    const responses = [
        "Olá! Como posso ajudar?",
        "Você sabe, estou sempre por aqui! O que você está fazendo?",
        "Mistérios do mundo, hein? Fico curioso também.",
        "Eu sou Simo, seu guia! O que você quer saber?"
    ];
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}
