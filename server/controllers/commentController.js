const { userModel, articleModel, commentModel } = require('../models');

function newPost(text, userId, themeId) {
  return commentModel.create({ text, userId, themeId })
    .then(post => {
      return Promise.all([
        userModel.updateOne({ _id: userId }, { $addToSet: { comments: themeId } }),
        articleModel.findByIdAndUpdate({ _id: themeId }, { $push: { posts: post._id }, $addToSet: { subscribers: userId } }, { new: true })
      ])
    })
}

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

  commentModel.find({ article: articleId }, { article: 0, __v: 0 })
    .sort({ createdAt: -1 })
    .populate('user', '-password -__v -articles -comments')
    .then(comments => res.status(200).json(comments))
    .catch(next);
}

function createCommentByArticleId(req, res, next) {
  const { articleId } = req.params;
  const { text } = req.body;
  const { _id: userId } = req.user;

  commentModel.create({ text, user: userId, article: articleId })
    .then(comment => {
      return Promise.all([
        comment,
        userModel.updateOne({ _id: userId }, { $addToSet: { comments: comment?._id } }),
        articleModel.updateOne({ _id: articleId }, { $addToSet: { comments: comment?._id } })
      ])
    })
    .then(([comment, userResult, articleResult]) => {
      if (comment && userResult.ok === 1 && articleResult.ok === 1) {
        res.status(200).json(comment);
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


function createPost(req, res, next) {
  const { themeId } = req.params;
  const { _id: userId } = req.user;
  const { postText } = req.body;

  newPost(postText, userId, themeId)
    .then(([_, updatedTheme]) => res.status(200).json(updatedTheme))
    .catch(next);
}

function editPost(req, res, next) {
  const { postId } = req.params;
  const { postText } = req.body;
  const { _id: userId } = req.user;

  // if the userId is not the same as this one of the post, the post will not be updated
  commentModel.findOneAndUpdate({ _id: postId, userId }, { text: postText }, { new: true })
    .then(updatedPost => {
      if (updatedPost) {
        res.status(200).json(updatedPost);
      }
      else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

function deletePost(req, res, next) {
  const { postId, themeId } = req.params;
  const { _id: userId } = req.user;

  Promise.all([
    commentModel.findOneAndDelete({ _id: postId, userId }),
    userModel.findOneAndUpdate({ _id: userId }, { $pull: { posts: postId } }),
    articleModel.findOneAndUpdate({ _id: themeId }, { $pull: { posts: postId } }),
  ])
    .then(([deletedOne, _, __]) => {
      if (deletedOne) {
        res.status(200).json(deletedOne)
      } else {
        res.status(401).json({ message: `Not allowed!` });
      }
    })
    .catch(next);
}

function like(req, res, next) {
  const { postId } = req.params;
  const { _id: userId } = req.user;

  console.log('like')

  commentModel.updateOne({ _id: postId }, { $addToSet: { likes: userId } }, { new: true })
    .then(() => res.status(200).json({ message: 'Liked successful!' }))
    .catch(next)
}

module.exports = {
  getCommentsByArticleId,
  createCommentByArticleId,
  editCommentByArticleId,
  deleteCommentByArticleId,
  getComments,
  newPost,
  createPost,
  editPost,
  deletePost,
  like,
}
