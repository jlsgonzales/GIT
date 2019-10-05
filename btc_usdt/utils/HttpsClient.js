const https = require('https');
const ClientHandlers = require('./ClientHandlers.js').ClientHandler;

class HttpsClient
{
	constructor(url, updateCbk) 
	{
		this.clientHandlers = new ClientHandlers(this);
        this.url = url;
        this.updateCbk = updateCbk;
        this.buffer=[]
        this.fetchFromClient();
	}
	fetchFromClient()
	{
		https.get(this.url, (res) => {
		  res.on('data', (d) => { this.clientHandlers.onData(d); }); 
          res.on('end', ()=>{this.updateCbk.update(JSON.parse(this.buffer));})
        }).on('error', (e) => { this.clientHandlers.onError(e); });
	}
	handle(msg)
	{
        if (msg == 'undefined')
        {
            return;
        }
        this.buffer += msg;
	}
};

module.exports = 
{
    HttpsClient : HttpsClient
}
