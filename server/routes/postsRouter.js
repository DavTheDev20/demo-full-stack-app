const auth = require('../middleware/auth');
const express = require('express');
const Post = require('../models/post');
const User = require('../models/user');

const postsRouter = express.Router();

postsRouter.all('/', auth, async (req, res, next) => {
  if (req.method === 'GET') {
    // Get All Posts
    try {
      const posts = await Post.find();
      res.status(200).json({ success: true, posts });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  } else if (req.method === 'POST') {
    // Create A New Post
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
  }
});

postsRouter.all('/:postId', auth, async (req, res, next) => {
  const { postId } = req.params;

  if (req.method === 'GET') {
    // GET Singular Post
    try {
      const post = await Post.findOne({ _id: postId });

      if (!post) {
        return res
          .status(404)
          .json({ success: false, msg: 'No post exists with that id' });
      }

      const author = await User.findOne({ _id: post.author });

      let editable = false;

      if (String(post.author) === String(req.user.userId)) {
        editable = true;
      }

      return res.status(200).json({ succcess: true, post, editable, author });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, error: err.message });
    }
  } else if (req.method === 'PUT') {
    // Update Singular Post
    try {
      const result = await Post.updateOne({ _id: postId }, req.body);

      return res.status(200).json({ success: true, result: result });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, msg: err.message });
    }
  } else if (req.method === 'DELETE') {
    // Delete Singular Post
    try {
      const post = await Post.findOne({ _id: postId });

      const postAuthor = await User.findOne({ _id: post.author });

      const result = await Post.deleteOne({ _id: postId });

      postAuthor.posts.splice(postAuthor.posts.indexOf(postId), 1);
      postAuthor.save();

      return res.status(200).json({ success: true, result: result });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ success: false, msg: err.message });
    }
  }
});

module.exports = postsRouter;
