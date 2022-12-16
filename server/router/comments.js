const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/', commentController.getComments);

module.exports = router