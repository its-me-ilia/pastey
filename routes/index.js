const express = require('express');
const router = express.Router();

router.use('/api/add-pastey', require('./addPastey'));
router.use('/api/get-pasteys', require('./getPasteys'));
router.use('/api/pasteys/', require('./pastey'));
router.use('/api/public-pasteys', require('./publicPasteys'));

module.exports = router