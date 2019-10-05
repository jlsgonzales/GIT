const HttpsClient = require ('../utils/HttpsClient.js').HttpsClient;
const ConstantsBundle = require('../utils/constants.js')

class OrderBookManager
{
    constructor()
    {
        this.httpsClient = new HttpsClient(ConstantsBundle.URL_SNAPSHOT, this);
        this.filter = new OrderFilter();
        this.bidList = []
        this.askList = []
    }
    update(msg)
    {
        this.snap = msg; 
        this.filter.updateConfig(this.snap);
    }
    handle(msg)
    {
        //TODO: buffer message
        const payload = JSON.parse(msg.utf8Data);
        if (this.filter.isGoodData(msg))
        {
            console.log("====="); 
        }
        // console.log("=====");
        // console.log("OBM_SYMBOL : ", payload.s);
        // console.log("OBM_BID : ", payload.b);
        // console.log("OBM_ASK : ", payload.a);
    }
};

class OrderFilter
{
    constructor()
    {
        this.config = new OrderBookManagerFilterConfig(); 
    }
    updateConfig(snap)
    {
        this.config.update(snap);
    }
    isGoodData(d)
    {
        // TODO: Implement filter
        return true;
    }
};

class OrderBookManagerFilterConfig
{
    constructor()
    {
        this.isFirst = true;
        this.prevU = 0;
    }
    update(snapshot)
    {
        this.lastUpdateId = snapshot.lastUpdateId;
        console.log("lastUpdateId",this.lastUpdateId)
    }
};

module.exports = 
{
    OrderBookManager : OrderBookManager
};