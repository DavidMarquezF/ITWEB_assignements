const { Server } = require('ws');
const scoreController = require('./score');

top10 = [];

// Create Websocket server
var wss = new Server({ noServer: true });
module.exports.start = async function(server) {
    wss = new Server({ server });

    const apiResult = await scoreController.getTopNScores(10);
    apiResult.subscribe({
        next: (value) => { 
            console.log('Server: ' + value);
            top10 = value;
        }
    });

    wss.on('connection', (ws, request) => {
        console.log('Client connected');
        // Send the top 10 on client connecting
        ws.send(JSON.stringify(top10));
        ws.on('close', () => console.log('Client disconnected'));
    });
      
    wss.on('message', (message) => {
        console.log('Received message: ' + message);
      
        wss.clients.forEach((client) => {
          client.send(message);
          console.log('Sent message: ' + message + ' to client ' + client);
        });
    });
}

