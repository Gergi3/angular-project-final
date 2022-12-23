const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { articleController, commentController } = require('../controllers');

router.get('/', articleController.getArticles);
router.post('/', auth(), articleController.createArticle);
router.get('/profile', auth(), articleController.getCurrentUserArticles);
router.get('/:articleId', articleController.getArticle);
router.put('/:articleId', auth(), articleController.editArticle);
router.delete('/:articleId', auth(), articleController.deleteArticle);

router.get('/:articleId/comments', commentController.getCommentsByArticleId);
router.post('/:articleId/comments', auth(), commentController.createCommentByArticleId);

module.exports = router