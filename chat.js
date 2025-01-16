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

// Inicializa o Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Função para registrar um novo usuário
async function registerUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Criar um novo usuário com e-mail e senha
        await auth.createUserWithEmailAndPassword(email, password);
        alert('Usuário registrado com sucesso!');
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('nickname-section').style.display = 'block';
    } catch (error) {
        console.error(error);
        alert(error.message); // Exibe a mensagem de erro
    }
}

// Função para fazer login
async function loginUser() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        // Tenta fazer login com o e-mail e senha
        await auth.signInWithEmailAndPassword(email, password);
        alert('Login bem-sucedido!');
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('nickname-section').style.display = 'block';
    } catch (error) {
        console.error(error);
        alert(error.message); // Exibe a mensagem de erro
    }
}

// Função para salvar o nickname do usuário
async function saveNickname() {
    const nickname = document.getElementById('nickname').value;
    const user = auth.currentUser;

    if (user) {
        // Salva o nickname no Firestore
        await db.collection('users').doc(user.uid).set({
            nickname: nickname
        });

        alert('Nickname salvo!');
        document.getElementById('nickname-section').style.display = 'none';
        document.getElementById('chat-section').style.display = 'block';
        loadMessages();
    }
}

// Função para enviar uma mensagem
async function sendMessage() {
    const messageContent = document.getElementById('message-input').value;
    const user = auth.currentUser;

    if (user && messageContent) {
        const userDoc = await db.collection('users').doc(user.uid).get();
        const nickname = userDoc.exists ? userDoc.data().nickname : user.email;

        await db.collection('messages').add({
            content: messageContent,
            nickname: nickname,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        document.getElementById('message-input').value = '';  // Limpar o campo de mensagem
    }
}

// Função para carregar mensagens
async function loadMessages() {
    const messagesContainer = document.getElementById('messages-container');
    const messagesSnapshot = await db.collection('messages').orderBy('timestamp').get();

    messagesSnapshot.forEach(doc => {
        const message = doc.data();
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message';
        messageDiv.innerHTML = `<strong>${message.nickname}</strong>: ${message.content}`;
        messagesContainer.appendChild(messageDiv);
    });

    // Scroll até a última mensagem
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Carregar mensagens constantemente
db.collection('messages').orderBy('timestamp').onSnapshot(snapshot => {
    loadMessages();
});
