const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

exports.index = async (req, res) => {
  const posts = await Post.find().sort({ created_at: -1 });

  res.json(posts);
}

exports.validate = (req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();
  req.checkBody('content', 'Content is required').notEmpty();

  const errors = req.validationErrors();

  if (errors) {
    return res.status(400).json(errors);
  }

  next();
}

exports.create = async (req, res) => {
  const post = new Post({
    user: req.user._id,
    title: req.body.title,
    content: req.body.content
  });

  const newPost = await post.save();

  res.json(newPost);
}

exports.show = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if(!post) {
    return res.status(404).json({
      message: 'Post not found'
    });
  }

  res.json(post);
}

exports.update = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: 'Post not found'
    });
  }

  if (!post.user === req.user._id) {
    return res.status(401).json({
      message: 'Your not allowed to do this operation'
    }); 
  }

  const updated = await Post.findOneAndUpdate({ _id: req.params.id }, {
    $set: {
      title: req.body.title,
      content: req.body.content
    }
  }, { new: true });

  res.json(updated);
}

exports.delete = async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return res.status(404).json({
      message: 'Post not found'
    });
  }

  await Post.findOneAndDelete({ _id: req.params.id });

  res.status(200).json({
    message: 'Post successfully deleted'
  });
}