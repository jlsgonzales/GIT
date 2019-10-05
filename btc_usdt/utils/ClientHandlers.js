 class ClientHandler {
constructor(cbk) {this.cbkHandlerClass = cbk}
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
    this.cbkHandlerClass.handle(msg) 
}

onData(d) 
{
    this.onMessage(d);
}

};

module.exports = 
{
    ClientHandler : ClientHandler
};