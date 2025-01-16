const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Banco de dados (simples) para armazenar mensagens
let messages = [];

// Rota para enviar mensagens
app.post('/send', (req, res) => {
    const { nick, message } = req.body;

    if (!nick || !message) {
        return res.status(400).json({ error: 'Nick e mensagem são obrigatórios.' });
    }

    // Salvar a mensagem
    const newMessage = { nick, message, timestamp: new Date() };
    messages.push(newMessage);

    return res.status(201).json({ success: true, message: 'Mensagem enviada!' });
});

// Rota para buscar mensagens
app.get('/messages', (req, res) => {
    res.json(messages);
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

