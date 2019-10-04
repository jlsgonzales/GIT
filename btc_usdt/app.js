const BinanceClient = require('./BinanceClient.js').BinanceClient;


const client = new BinanceClient('wss://stream.binance.com:9443/ws/btcusdt@depth@100ms')
client.connect() 