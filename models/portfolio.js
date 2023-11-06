const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
  riskTolerance: Number,
  nigerianStocks: Number,
  foreignStocks: Number,
  techStocks: Number,
  emergingStocks: Number,
  nigerianBonds: Number,
  foreignBonds: Number,
  commodities: Number,
  realEstate: Number,
  tBills: Number,
  alternative: Number,
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);

module.exports = Portfolio;
