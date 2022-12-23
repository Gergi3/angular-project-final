const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/', commentController.getComments);
router.put('/:commentId', auth(), commentController.editCommentByArticleId);
router.delete('/:commentId', auth(), commentController.deleteCommentByArticleId);

module.exports = router