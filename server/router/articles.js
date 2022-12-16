const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { articleController, commentController } = require('../controllers');

// middleware that is specific to this router

router.get('/', articleController.getArticles);
router.get('/:articleId', articleController.getArticle);
router.post('/', auth(), articleController.createArticle);
router.put('/:articleId', auth(), articleController.editArticle);
router.delete('/:articleId', auth(), articleController.deleteArticle);

router.get('/:articleId/comments', commentController.getCommentsByArticleId);
router.post('/:articleId/comments', auth(), commentController.createCommentByArticleId);
router.put('/:articleId/comments/:commentId', auth(), commentController.editCommentByArticleId);
router.delete('/:articleId/comments/:commentId', auth(), commentController.deleteCommentByArticleId);

// router.post('/:themeId', auth(), commentController.createPost);
// router.put('/:themeId', auth(), articleController.subscribe);
// router.put('/:themeId/posts/:postId', auth(), commentController.editPost);
// router.delete('/:themeId/posts/:postId', auth(), commentController.deletePost);

// router.get('/my-trips/:id/reservations', auth(), articleController.getReservations);

module.exports = router