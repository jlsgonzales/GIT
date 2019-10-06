const WebSocketClient = require('websocket').client;
const OrderBookManager = require ('./managers/OrderBookManager.js').OrderBookManager;
const ClientHandlers = require("./utils/ClientHandlers.js").ClientHandler;
const ConstantsBundle = require('./utils/constants.js')

class BinanceClient
{
    constructor(endpoint)
    {
        this.orderBookManager = new OrderBookManager();
        this.clientHandler = new ClientHandlers(this.orderBookManager);
        this.clientSocket = new WebSocketClient();
        this.endpoint = endpoint;
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
    }
    getPrice(side, quantity)
    {
        if(side == 'buy' )
        {
            if (quantity <= this.orderBookManager.orderBook.bidQuantity)
                {console.log("getBidList", quantity);}
        }
        else if(side == 'sell')
        {
            if (quantity <= this.orderBookManager.orderBook.bidQuantity)
                {console.log("getBidList", quantity);}
        }
        else
        {
            console.log("ERROR unsuported side", side)
        }
    }
}

module.exports = {
    BinanceClient : BinanceClient
}