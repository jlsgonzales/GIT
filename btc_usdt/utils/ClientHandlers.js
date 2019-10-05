class ClientHandler {
constructor(cbk) {this.cbkClass = cbk}
onConnectFailed(error) 
{
    console.log('Connect Error: ' + error.toString());
}

onConnect()
{
    console.log('Connected to Binance stream');
}

onError(err)
{
    console.log('Error: ', err.toString());
}

onConnectionClosed()
{
    console.log('Connection Closed');   
}

onMessage(msg)
{
    this.cbkClass.onMessage(msg)
}
};


module.exports = 
{
    ClientHandler : ClientHandler
};