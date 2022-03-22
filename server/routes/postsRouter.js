const auth = require('../middleware/auth');
const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');

const postsRouter = express.Router();

postsRouter
  .get('/', auth, async (req, res) => {
    try {
      const posts = await Post.find();
      res.status(200).json({ success: true, posts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  })
  .post('/', auth, async (req, res) => {
    const { title, content } = req.body;

    if (!(title && content)) {
      return res
        .status(400)
        .json({ success: false, msg: 'No values retrieved for post creation' });
    }

    try {
      const newPost = await Post.create({
        author: req.user.userId,
        title,
        content,
      });

      const postAuthor = await User.findOne({ _id: req.user.userId });
      await postAuthor.posts.push(newPost._id);
      await postAuthor.save();

      return res.status(201).json({ success: true, post: newPost });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false });
    }
  })
  .get('/:postId', auth, async (req, res) => {
    const { postId } = req.params;

    try {
      const post = await Post.findOne({ _id: postId });

      if (!post) {
        return res
          .status(404)
          .json({ success: false, msg: 'No post exists with that id' });
      }

      let editable = false;

      if (String(post.author) === String(req.user.userId)) {
        editable = true;
      }

      return res.status(200).json({ succcess: true, post, editable });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: err.message });
    }
  })
  .delete('/:postId', auth, async (req, res) => {
    const { postId } = req.params;

    try {
      const result = await Post.deleteOne({ _id: postId });

      const postAuthor = await User.findOne({ _id: req.user.userId });

      postAuthor.posts.splice(postAuthor.posts.indexOf(postId));
      postAuthor.save();

      return res.status(200).json({ success: true, result: result });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, msg: err.message });
    }
  })
  .put('/:postId', auth, async (req, res) => {
    const { postId } = req.params;

    try {
      const result = await Post.updateOne({ _id: postId }, req.body);

      return res.status(200).json({ success: true, result: result });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, msg: err.message });
    }
  });

module.exports = postsRouter;
