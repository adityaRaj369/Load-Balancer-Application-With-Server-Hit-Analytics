
const Url = require('../models/Url');
const axios = require('axios');

let connections = []; 
let serverStatus = []; 

const createShortUrl = async (req, res) => {
  const { servers } = req.body; 
  try {
    const url = await Url.create({ servers }); 
    connections = new Array(servers.length).fill(0); 
    serverStatus = new Array(servers.length).fill(true); 
    res.json({ shortUrl: `${req.protocol}://${req.get('host')}/${url.shortUrl}` });
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: 'Server error' });
  }
};

const checkServerHealth = async (index, serverUrl) => {
  try {
    await axios.get(serverUrl);
    serverStatus[index] = true;
  } catch {
    serverStatus[index] = false;
  }
};
const redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.code });
    if (!url) return res.status(404).json({ message: 'URL not found' });

    let availableServers = url.servers.filter((_, index) => serverStatus[index]);
    if (availableServers.length === 0) return res.status(503).json({ message: 'All servers are unavailable' });

    let leastConnectionIndex = -1;
    for (let i = 0; i < availableServers.length; i++) {
      const originalIndex = url.servers.indexOf(availableServers[i]);
      if (leastConnectionIndex === -1 || connections[originalIndex] < connections[leastConnectionIndex]) {
        leastConnectionIndex = originalIndex;
      }
    }

    const targetServer = url.servers[leastConnectionIndex];
    connections[leastConnectionIndex] += 1;

    url.hitCount += 1;
    url.hitData.push({ serverName: targetServer.name, timestamp: Date.now() });
    await url.save();

    res.redirect(targetServer.url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


setInterval(() => {
  // Use a fresh copy of the servers array to avoid undefined issues
  Url.find().then(urls => {
    urls.forEach(url => {
      url.servers.forEach((serverUrl, index) => {
        checkServerHealth(index, serverUrl.url);
      });
    });
  });
}, 5000);

// const getAnalytics = async (req, res) => {
//   try {
//     const url = await Url.findOne({ shortUrl: req.params.code });
//     if (!url) return res.status(404).json({ message: 'URL not found' });

//     const analytics = url.hitData.reduce((acc, hit) => {
//       acc[hit.serverName] = acc[hit.serverName] || [];
//       acc[hit.serverName].push({ timestamp: hit.timestamp });
//       return acc;
//     }, {});

//     res.json({ hitCount: url.hitCount, hitData: analytics });
//   } catch (error) {
//     console.error(error); 
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const getAnalytics = async (req, res) => {
  try {
    const url = await Url.findOne({ shortUrl: req.params.code });
    if (!url) return res.status(404).json({ message: 'URL not found' });

    const analytics = url.hitData.reduce((acc, hit) => {
      acc[hit.serverName] = acc[hit.serverName] || [];
      acc[hit.serverName].push({ timestamp: hit.timestamp });
      return acc;
    }, {});

    // Ensure all servers are included in the analytics
    url.servers.forEach((server, index) => {
      if (!analytics[server.name]) {
        analytics[server.name] = []; // Initialize with an empty array
      }
      // If the server is down, explicitly set hits to 0 (optional)
      if (!serverStatus[index]) {
        analytics[server.name].push({ timestamp: null }); // Corrected from `acc` to `analytics`
      }
    });

    res.json({ hitCount: url.hitCount, hitData: analytics });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { createShortUrl, redirectUrl, getAnalytics };
