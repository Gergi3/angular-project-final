const { articleModel, userModel, commentModel } = require('../models');

function getArticles(req, res, next) {
  articleModel.find({}, { __v: 0 })
    .populate('user', '-password -__v')
    .then(articles => res.status(200).json(articles))
    .catch(next);
}

function getArticle(req, res, next) {
  const { articleId } = req.params;

  articleModel.findById(articleId, { __v: 0 })
    .populate('user', '-password -__v')
    .then(article => res.status(200).json(article))
    .catch(next);
}

function getCurrentUserArticles(req, res, next) {
  const { _id: userId } = req.user;

  articleModel.find({ user: userId }, { __v: 0 })
    .populate('user', '-password -__v')
    .then(articles => res.status(200).json(articles))
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
        commentModel.deleteOne({ article: articleId })
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
  deleteArticle,
  getCurrentUserArticles
}
