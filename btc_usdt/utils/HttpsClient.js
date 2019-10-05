const https = require('https');
const ClientHandlers = require('./ClientHandlers.js').ClientHandler;

class HttpsClient
{
	constructor() 
	{
		this.clientHandlers = new ClientHandlers(this);
	}
	readToBuffer(url)
	{
		https.get(url, (res) => {
		  res.on('data', (d) => { this.clientHandlers.onMessage(d); }); 
        }).on('error', (e) => { this.clientHandlers.onError(e); });
	}
    fetch(url)
    {
        this.readToBuffer(url);
        return this.buffer;  // TO DO: Fill up buffer
    }
	onMessage(msg)
	{
        this.buffer = msg;
	}
};

module.exports = 
{
    HttpsClient : HttpsClient
}
