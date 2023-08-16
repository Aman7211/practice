const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Get user profile
router.get('/api/user', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const followersCount = user.followers.length;
    const followingsCount = user.followings.length;

    res.json({ name: user.name, followers: followersCount, followings: followingsCount });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Follow a user
router.post('/api/follow/:id', async (req, res) => {
  try {
    const targetUserId = req.params.id;
    const authenticatedUserId = req.body.authenticatedUserId; // Assuming you're passing the authenticated user ID in the request body

    const authenticatedUser = await User.findById(authenticatedUserId);
    const targetUser = await User.findById(targetUserId);

    if (!targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (authenticatedUser.followings.includes(targetUserId)) {
      return res.status(400).json({ message: 'You are already following this user' });
    }

    authenticatedUser.followings.push(targetUserId);
    await authenticatedUser.save();

    targetUser.followers.push(authenticatedUserId);
    await targetUser.save();

    res.json({ message: 'Followed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Other user-related routes can be added here

module.exports = router;
