// const express = require('express');
// const router = express.Router();
// const { createShortUrl, redirectUrl } = require('../controllers/loadBalancerController');

// router.post('/api/shorten', createShortUrl);
// router.get('/:code', redirectUrl);

// module.exports = router;


const express = require('express');
const router = express.Router();
const { createShortUrl, redirectUrl, getAnalytics } = require('../controllers/loadBalancerController');

router.post('/api/shorten', createShortUrl);
router.get('/:code', redirectUrl);
router.get('/api/analytics/:code', getAnalytics);

module.exports = router;
