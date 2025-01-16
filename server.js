const WebSocket = require('ws');

// Criar o servidor WebSocket
const wss = new WebSocket.Server({ port: 8080 });

let clients = [];

wss.on('connection', (ws) => {
    console.log('Novo usuário conectado');
    clients.push(ws);

    // Receber mensagens
    ws.on('message', (message) => {
        console.log(`Mensagem recebida: ${message}`);

        // Enviar mensagem para todos os clientes conectados
        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // Remover cliente ao desconectar
    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
        console.log('Usuário desconectado');
    });
});
