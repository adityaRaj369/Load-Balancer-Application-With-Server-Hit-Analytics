// const mongoose = require('mongoose');
// const shortid = require('shortid');

// const urlSchema = new mongoose.Schema({
//   originalUrls: [String],
//   shortUrl: { type: String, default: shortid.generate },
//   hitCount: { type: Number, default: 0 },
//   hitData: [{ timestamp: { type: Date, default: Date.now }, url: String }],
// });

// module.exports = mongoose.model('Url', urlSchema);



const mongoose = require('mongoose');
const shortid = require('shortid');

const urlSchema = new mongoose.Schema({
  servers: [{
    name: String,
    url: String
  }],
  shortUrl: { type: String, default: shortid.generate },
  hitCount: { type: Number, default: 0 },
  hitData: [{
    serverName: String,
    timestamp: { type: Date, default: Date.now }
  }],
});

module.exports = mongoose.model('Url', urlSchema);



