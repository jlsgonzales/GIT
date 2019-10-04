class ClientHandler {
constructor() {}
onConnectFailed(error) 
{
    console.log('Connect Error: ' + error.toString());
}

onConnect()
{
    console.log('Connected to Binance stream');
}

onConnectionError(err)
{
    console.log('Connection Error', err.toString());
}

onConnectionClosed()
{
    console.log('Connection Closed');   
}

filter(msg)
{
    const payload = JSON.parse(msg.utf8Data);
    console.log("SYMBOL : ", payload.s);
    console.log("BID : ", payload.b);
    console.log("ASK : ", payload.a);
}
};


module.exports = 
{
    ClientHandler : ClientHandler
};