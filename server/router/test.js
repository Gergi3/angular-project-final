const express = require('express');
const router = express.Router();

// middleware that is specific to this router

const data = {
  name: 'rest-api',
  version: '1.0.0',
  description: 'REST API service for back-end of Mediary, Angular course final project at SoftUni',
  main: 'index.js',
}

router.get('/', function (req, res) {
  res.status(200).json(data);
})

module.exports = router