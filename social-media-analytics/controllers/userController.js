const userService = require('../services/userService');

exports.getTopUsers = async (req, res) => {
  try {
    const topUsers = await userService.getTopUsers();
    res.json(topUsers);
  } catch (error) {
    console.error('Error in getTopUsers controller:', error.message);
    res.status(500).json({ error: 'Failed to fetch top users' });
  }
};