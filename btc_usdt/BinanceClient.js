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
            this.clientHandler.heartbeat(this.clientSocket);    
        });
    }
    connect()
    {
        this.clientSocket.connect(this.endpoint);
    }
    getPrice(side, quantity)
    {
        this.requestedSide = side;
        this.reqestedQuantity = quantity; 
        this.orderBookManager.setUpdateCbk(this);
    }
    update()
    {
        var listToCompute = [];
        if ('buy' == this.requestedSide)
        {
            if (this.orderBookManager.orderBook.bidQuantity < this.reqestedQuantity)
            {
                console.log("Waiting.... Not enough Accumulated BidQuantity in Order Book")
                return;
            }
            listToCompute = this.orderBookManager.orderBook.bids;
        }
        else if ('sell' == this.requestedSide)
        {
            if (this.orderBookManager.orderBook.askQuantity < this.reqestedQuantity)
            {
                console.log("Waiting.... Not enough Accumulated AskQuantity in Order Book")
                return;
            }
            listToCompute = this.orderBookManager.orderBook.asks;
        }
        else
        {
            console.error("ERROR invalid side", this.requestedSide)
            return;
        }
        var currAve = this.computeWeightedAverage(listToCompute, this.reqestedQuantity);
        this.logIfNew(currAve);
    }
    computeWeightedAverage(dataList, quantity)
    {
        var listToCompute = [];
        var accumulated = 0; 
        for (var data of dataList)
        {
            if (accumulated >= quantity)
            {
                break;
            }
            listToCompute.push(data); 
            accumulated += data[1]; //accumulate quantity
        }
        var weightedSum = 0;
        for (var data of listToCompute)
        {
            weightedSum += data[0] * data[1];
        }
        return weightedSum / accumulated;
    }
    logIfNew(ave)
    {
        if (this.prevAve == ave)
        {
            return;
        }
        console.log("==========");
        console.log("SIDE : ", this.requestedSide);
        console.log("QUANTITY : ", this.reqestedQuantity);
        console.log("PRICE WEIGHTED AVERAGE : ", ave);
        this.prevAve = ave;
    }
}

module.exports = {
    BinanceClient : BinanceClient
}