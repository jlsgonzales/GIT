const BinanceClient = require('./BinanceClient.js').BinanceClient;
const ConstantsBundle = require('./utils/constants.js');

const client = new BinanceClient(ConstantsBundle.URL_STREAM)
client.connect() 
client.getPrice('buy', 10)