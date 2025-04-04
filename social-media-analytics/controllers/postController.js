const postService = require('../services/postService');

exports.getPosts = async (req, res) => {
  try {
    const { type } = req.query;
    
    if (!type || (type !== 'popular' && type !== 'latest')) {
      return res.status(400).json({ 
        error: 'Invalid query parameter. Type must be either "popular" or "latest"' 
      });
    }
    
    if (type === 'popular') {
      const popularPosts = await postService.getPopularPosts();
      return res.json(popularPosts);
    } else {
      const latestPosts = await postService.getLatestPosts(5);
      return res.json(latestPosts);
    }
  } catch (error) {
    console.error('Error in getPosts controller:', error.message);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};