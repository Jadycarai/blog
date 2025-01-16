// Configuração do Firebase

const firebaseConfig = {
  apiKey: "AIzaSyAyysNMTDMN5nJsZpZK-w73Ko5X2SKZSN0",
  authDomain: "projeto-conversa-d94ad.firebaseapp.com",
  projectId: "projeto-conversa-d94ad",
  storageBucket: "projeto-conversa-d94ad.firebasestorage.app",
  messagingSenderId: "23391291535",
  appId: "1:23391291535:web:a129b0560149eccd0fc8fa",
  measurementId: "G-5VVV1SC71D"
};
// Inicializar o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Função para enviar uma mensagem
function sendMessage() {
    const userMessage = document.getElementById('user-message').value;
    if (userMessage.trim() !== "") {
        // Exibe a mensagem do usuário
        displayMessage(userMessage, "user-message");
        
        // Limpa o campo de entrada
        document.getElementById('user-message').value = "";

        // Envia a mensagem para o Firebase
        db.collection("messages").add({
            sender: "user",
            message: userMessage,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        // Simula uma resposta do Simo após 1 segundo
        setTimeout(() => {
            const simoResponse = generateSimoResponse();
            displayMessage(simoResponse, "simo-message");

            // Envia a resposta do Simo para o Firebase
            db.collection("messages").add({
                sender: "simo",
                message: simoResponse,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        }, 1000);
    }
}

// Função para exibir a mensagem no chat
function displayMessage(message, sender) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
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

// Função para carregar as mensagens do Firebase
function loadMessages() {
    db.collection("messages")
        .orderBy("timestamp")
        .onSnapshot(snapshot => {
            const messages = snapshot.docs.map(doc => doc.data());
            document.getElementById('chat-box').innerHTML = "";
            messages.forEach(msg => {
                displayMessage(msg.message, msg.sender === "user" ? "user-message" : "simo-message");
            });
        });
}

// Carregar as mensagens ao abrir a página
loadMessages();
