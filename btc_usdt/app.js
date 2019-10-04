const WebSocketClient = require('websocket').client;

const binanceClient = new WebSocketClient();

function onConnectFailed(error) 
{
	console.log('Connect Error: ' + error.toString());
}

function onConnect()
{
	console.log('Connected to Binance stream');
}

function onConnectionError(err)
{
	console.log('Connection Error', err.toString());
}

function onConnectionClosed()
{
	console.log('Connection Closed');	
}

function filter(msg)
{
	// console.log('Symbol ', msg.s);
	payload = JSON.parse(msg.utf8Data);
	console.log("SYMBOL : ", payload.s);
	console.log("BID : ", payload.b);
	console.log("ASK : ", payload.a);

	// console.log('Ask ', msg.a[0];
}

binanceClient.on('connectFailed', (error)=>{onConnectFailed(error);});
binanceClient.on('connect', (connection)=>{
	onConnect();
	connection.on('error', (error)=>{onConnectionError(error);});
    connection.on('close', ()=>{onConnectionClosed();});
    connection.on('message', (msg)=>{ filter(msg); });    
});

binanceClient.connect('wss://stream.binance.com:9443/ws/btcusdt@depth@100ms')