// Firebase Configuração
const firebaseConfig = {
    apiKey: "AIzaSyAyysNMTDMN5nJsZpZK-w73Ko5X2SKZSN0",
    authDomain: "projeto-conversa-d94ad.firebaseapp.com",
    databaseURL: "https://projeto-conversa-d94ad.firebaseio.com",
    projectId: "projeto-conversa-d94ad",
    storageBucket: "projeto-conversa-d94ad.appspot.com",
    messagingSenderId: "23391291535",
    appId: "1:23391291535:web:a129b0560149eccd0fc8fa",
    measurementId: "G-5VVV1SC71D"
};

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Referência ao container de mensagens
const messagesRef = database.ref('messages');

// Elementos do HTML
const nicknameInput = document.getElementById('nickname');
const registerBtn = document.getElementById('registerBtn');
const chatBox = document.getElementById('chatBox');
const messagesContainer = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');

let userNickname = "";

// Função para registrar o usuário
registerBtn.addEventListener('click', () => {
    userNickname = nicknameInput.value.trim();
    if (userNickname) {
        document.querySelector('.user-registration').style.display = 'none';
        chatBox.style.display = 'block';
        loadMessages(); // Carrega mensagens antigas ao registrar
    } else {
        alert("Por favor, digite um nome.");
    }
});

// Função para enviar a mensagem
sendMessageBtn.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        const messageData = {
            nickname: userNickname,
            message: message,
            timestamp: new Date().toISOString()
        };

        messagesRef.push(messageData); // Envia para o Firebase
        messageInput.value = ""; // Limpa o campo de mensagem
    }
});

// Função para carregar mensagens
function loadMessages() {
    messagesRef.orderByChild('timestamp').on('child_added', (snapshot) => {
        const messageData = snapshot.val();
        const messageElement = document.createElement('p');
        messageElement.textContent = `${messageData.nickname}: ${messageData.message}`;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight; // Mantém o scroll para o fundo
    });
}
