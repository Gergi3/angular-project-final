const { articleModel, userModel, commentModel } = require('../models');
const { newPost } = require('./commentController')

function getArticles(req, res, next) {
  articleModel.find({}, { comments: 0, description: 0, __v: 0 })
    .populate('user', '-password -__v -articles -comments')
    .then(articles => res.json(articles))
    .catch(next);
}

function getArticle(req, res, next) {
  const { articleId } = req.params;

  articleModel.findById(articleId, { __v: 0 })
    .populate('comments') // TODO: Exclude bullshit stuff
    .populate('user', '-password -__v -articles -comments -email')
    .then(article => res.json(article))
    .catch(next);
}

function createArticle(req, res, next) {
  const { title, summary, description, imageUrl } = req.body;
  const { _id: userId } = req.user;

  articleModel.create({ title, summary, description, imageUrl, user: userId })
    .then(article => {
      return Promise.all([
        article,
        userModel.updateOne({ _id: userId }, { $addToSet: { articles: article._id } })
      ]);
    })
    .then(([article, user]) => {
      if (article && user.ok === 1) {
        res.status(200).json(article);
      } else {
        res.status(401).json({ message: 'Not allowed!' })
      }
    })
    .catch(next);
}

function editArticle(req, res, next) {
  const { articleId } = req.params;
  const { title, summary, description, imageUrl } = req.body;
  const { _id: userId } = req.user;

  articleModel.findOneAndUpdate(
    { _id: articleId, user: userId },
    { title, summary, description, imageUrl },
    { new: true, runValidators: true })
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

function deleteArticle(req, res, next) {
  const { articleId } = req.params;
  const { _id: userId } = req.user;

  articleModel.findOneAndDelete({ _id: articleId, user: userId })
    .then(deleted => {
      return Promise.all([
        deleted,
        userModel.updateOne({ _id: userId }, { $pull: { articles: deleted?._id } }),
        commentModel.remove({ article: articleId })
      ])
    })
    .then(([deleted, userResult, commentResult]) => {
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

module.exports = {
  getArticles,
  createArticle,
  getArticle,
  editArticle,
  deleteArticle
}
