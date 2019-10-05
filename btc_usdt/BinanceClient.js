const WebSocketClient = require('websocket').client;
const ClientHandlers = require("./utils/ClientHandlers.js").ClientHandler;
const HttpsClient = require ('./utils/HttpsClient.js').HttpsClient;
const ConstantsBundle = require('./utils/constants.js')

class BinanceClient
{
    constructor(endpoint)
    {
        this.clientHandler = new ClientHandlers(this);
        this.clientSocket = new WebSocketClient();
        this.endpoint = endpoint;
        this.httpsClient = new HttpsClient();
        this.initClientSocket();
    }
    initClientSocket()
    {
        this.clientSocket.on('connectFailed', (error)=>{this.clientHandler.onConnectFailed(error);});
        this.clientSocket.on('connect', (connection)=>{
            this.clientHandler.onConnect();
            connection.on('error', (error)=>{this.clientHandler.onError(error);});
            connection.on('close', ()=>{this.clientHandler.onConnectionClosed();});
            connection.on('message', (msg)=>{ this.clientHandler.onMessage(msg); });    
        });
    }
    connect()
    {
        this.clientSocket.connect(this.endpoint);
        this.depthSnapshot = this.httpsClient.fetch(ConstantsBundle.URL_SNAPSHOT);

    }
    onMessage(msg)
    {
        const payload = JSON.parse(msg.utf8Data);
        console.log("SYMBOL : ", payload.s);
        console.log("BID : ", payload.b);
        console.log("ASK : ", payload.a);
    }

}

module.exports = {
    BinanceClient : BinanceClient
}