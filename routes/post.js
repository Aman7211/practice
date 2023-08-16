const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('/api/posts', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Create a new post
    const newPost = new Post({
      title,
      description,
    });
    
    // Save the post to the database
    await newPost.save();
    
    res.status(201).json({
      message: 'Post created successfully',
      post: {
        id: newPost._id,
        title: newPost.title,
        description: newPost.description,
        createdAt: newPost.createdAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Other post-related routes can be added here

module.exports = router;
