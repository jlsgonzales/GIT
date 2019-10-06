DESIGN:
app.js
	1. Node entry point

BinanceClient.js
	1. Top Level class
	2. Owns the websocket
	3. Owns OrderBookManager

managers/OrderBookManager.js 
	- OrderBookManager 
		1. Owner of OrderBook
		2. Uses OrderBookFilter to sift GoodData, GoodBid, and Goodasks
	- OrderBookFilter
	- OrderBook
		1.bids = filtered bids, arranged from highest to lowest
		2.asks = filtered asks, arranged from lowest to highest
		3.bidQuantity = accumulated quantity of all entries in bids
		4.askQuantity = accumulated quantity of all entries in asks

utils/ClientHandlers.js
	1.Helper Class to hold common client event handlers

utils/constants.js
	1. Constants bundle

utils/HttpsClient.js
	1. Wrapper for HttpsClient

=======================================================================================================

IMPROVE:
1. use process instead of console.log
2. Maybe better to create a BinanceClientManager to offload responsibility from BinanceClient and make it just a client
3. TEST
