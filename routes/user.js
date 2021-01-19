const express = require('express');
const router = express.Router();
const singupController = require('../controllers/user/singup');
const singinController = require('../controllers/user/singin');
const statusController = require('../controllers/user/status');

router.post('/signup', singupController);
router.post('/signin', singinController);
router.get('/status', statusController);

module.exports = router;