const HttpsClient = require ('../utils/HttpsClient.js').HttpsClient;
const ConstantsBundle = require('../utils/constants.js')

class OrderBookManager
{
    constructor()
    {
        this.httpsClient = new HttpsClient(ConstantsBundle.URL_SNAPSHOT, this);
        this.filter = new OrderFilter();
        this.orderBook = new OrderBook();
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
        if (!this.filter.isGoodData(payload))
        {
            console.log("DROPPED DATA"); 
            return;
        }
        console.log("=====");
        this.updateLists(payload);
    }
    updateLists(data)
    {
        this.updateBidList(data);
        this.updateAskList(data);
    }
    updateBidList(data)
    {
        for (var bid of data.b)
        {
            if(!this.filter.isGoodBid(bid))
            {
                return;   
            }
            this.orderBook.bids.push(bid)
            this.orderBook.bids.sort((b1, b2)=>{return b2[0] - b1[0];});
        }
    }
    updateAskList(data)
    {
        for (var ask of data.a)
        {
            if (!this.filter.isGoodAsk(ask))
            {
                return;   
            }
            this.orderBook.asks.push(ask)
            this.orderBook.asks.sort((a1,a2)=>{return a1[0] - a2[0];});
        }
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
        if (this.config.isFirst)
        {
            return this.checkFirstUpdate(d);
        }
        return this.checkSequence(d);
    }
    checkFirstUpdate(data)
    {
        if ((data.u <= this.config.lastUpdateId) && (data.U > this.config.lastUpdateId))
        {
            return false;
        }
        this.config.isFirst = false;
        this.config.prevu = data.u;
        return true;
    }
    checkSequence(data)
    {
        if (data.U != this.config.prevu + 1)
        {
            return false;
        }
        this.config.prevu = data.u;
        return true;
    }
    isGoodBid(b)
    {
        return b[1] != 0  
    }
    isGoodAsk(a)
    {
        return a[1] != 0 
    }
};
class OrderBook
{
    constructor()
    {
        this.bids = [];
        this.asks = [];
    }
}
class OrderBookManagerFilterConfig
{
    constructor()
    {
        this.isFirst = true;
        this.prevu = 0;
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