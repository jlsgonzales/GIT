class ClientHandler 
{
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

heartbeat(sockCLient)
{
  if (!sockCLient) return;
  if (sockCLient.readyState !== 1) return;
  sockCLient.send('pong');
  setTimeout(heartbeat, 300000); //send every 5 mins
}

};

module.exports = 
{
    ClientHandler : ClientHandler
};