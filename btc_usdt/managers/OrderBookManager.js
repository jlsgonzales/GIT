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
            var index = this.orderBook.bids.findIndex((bidListItem)=> {
                return bidListItem[0] == bid[0];
            })
            if (index == -1)
            {
                var parsedBidEntry = [parseFloat(bid[0]), parseFloat(bid[1])];
                this.orderBook.bids.push(parsedBidEntry); //NEW ENTRY
                this.orderBook.bids.sort((b1, b2)=>{return b2[0] - b1[0];});
            }
            else
            {
                var parsedQuantiy = parseFloat(bid[1]);
                this.orderBook.bids[index][1] += parsedQuantiy; // OLD ENTRY ADD QUANTITY
            }

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
            var index = this.orderBook.asks.findIndex((askListItem) => {
                return askListItem[0] == ask[0];
            })
            if (index == -1)
            {
                var parsedAskEntry = [parseFloat(ask[0]), parseFloat(ask[1])];
                this.orderBook.asks.push(parsedAskEntry) //NEW ENTRY
                this.orderBook.asks.sort((a1,a2)=>{return a1[0] - a2[0];});
            }
            else
            {
                var parsedQuantiy = parseFloat(ask[1]);
                this.orderBook.asks[index][1] += parsedQuantiy;
            }
        }
        console.log("ASK_LIST: ",this.orderBook.asks);
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