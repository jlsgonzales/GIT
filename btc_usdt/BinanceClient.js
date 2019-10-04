const WebSocketClient = require('websocket').client;
const ClientHandlers = require("./ClientHandlers.js").ClientHandler;

class BinanceClient
{
    constructor(endpoint)
    {
        this.clientHandler = new ClientHandlers();
        this.clientSocket = new WebSocketClient();
        this.endpoint = endpoint;
        this.initClientSocket();
    }
    initClientSocket()
    {
        this.clientSocket.on('connectFailed', (error)=>{this.clientHandler.onConnectFailed(error);});
        this.clientSocket.on('connect', (connection)=>{
            this.clientHandler.onConnect();
            connection.on('error', (error)=>{this.clientHandler.onConnectionError(error);});
            connection.on('close', ()=>{this.clientHandler.onConnectionClosed();});
            connection.on('message', (msg)=>{ this.clientHandler.filter(msg); });    
        });
    }
    connect()
    {
        this.clientSocket.connect(this.endpoint);
    }

}

module.exports = {
    BinanceClient : BinanceClient
}