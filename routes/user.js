const express = require('express');
const router = express.Router();
const singupController = require('../controllers/user/singup');
const singinController = require('../controllers/user/singin');


router.post('/signup', singupController);
router.post('/signin', singinController);

module.exports = router;