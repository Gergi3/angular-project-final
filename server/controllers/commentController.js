const { userModel, articleModel, commentModel } = require('../models');
function getComments(req, res, next) {
  commentModel.find({}, { __v: 0 })
  .then(comments => res.status(200).json(comments))
  .catch(next);
}

//   commentModel.find({ })
//     .sort({ createdAt: -1 })
//     .limit(limit)
//     .populate('themeId userId')
//     .then(posts => {
//       res.status(200).json(posts)
//     })
//     .catch(next);
function getCommentsByArticleId(req, res, next) {
  const { articleId } = req.params;

  commentModel.find({ article: articleId }, { __v: 0 })
    .sort({ createdAt: -1 })
    .populate('user', '-password -__v')
    .then(comments => res.status(200).json(comments))
    .catch(next);
}

function createCommentByArticleId(req, res, next) {
  const { articleId } = req.params;
  const { text } = req.body;
  const { _id: userId } = req.user;

  commentModel.create({ text: text, user: userId, article: articleId }  )
    .then(comment => {
      return Promise.all([
        comment,
        userModel.updateOne({ _id: userId }, { $addToSet: { comments: comment?._id } }),
        articleModel.updateOne({ _id: articleId }, { $addToSet: { comments: comment?._id } })
      ])
    })
    .then(([comment, userResult, articleResult]) => {
      if (comment && userResult.ok === 1 && articleResult.ok === 1) {
        commentModel.findOne({ _id: comment._id }, { __v: 0 })
          .populate('user', '-pasword -__v')
          .then(commentPopulated => res.status(200).json(commentPopulated))
          .catch(err => res.status(401).json({ message: 'Not allowed' }))
      } else {
        res.status(401).json({ message: 'Not allowed' })
      }
    })
    .catch(next);
}

function editCommentByArticleId(req, res, next) {
  const { articleId, commentId } = req.params;
  const { text } = req.body;
  const { _id: userId } = req.user;

  commentModel.findOneAndUpdate(
    { _id: commentId, user: userId },
    { text, user: userId, article: articleId },
    { new: true, runValidators: true })
    .then(comment => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(401).json({ message: 'Not allowed' })
      }
    })
    .catch(next);
}

function deleteCommentByArticleId(req, res, next) {
  const { articleId, commentId } = req.params;
  const { _id: userId } = req.user;

  commentModel.findOneAndDelete({ _id: commentId, user: userId })
    .then(comment => {
      return Promise.all([
        comment,
        userModel.updateOne({ _id: userId }, { $pull: { comments: comment?._id } }),
        articleModel.updateOne({ _id: articleId }, { $pull: { comments: comment?._id } })
      ])
    })
    .then(([comment, userResult, articleResult]) => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

module.exports = {
  getCommentsByArticleId,
  createCommentByArticleId,
  editCommentByArticleId,
  deleteCommentByArticleId,
  getComments,
}
