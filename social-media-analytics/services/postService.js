const apiClient = require('./apiClient');

class PostService {
  constructor() {
    this.endpoints = {
      posts: '/posts',
      postComments: '/posts/:postId/comments'
    };
  }

  async getAllPosts() {
    try {
      const response = await apiClient.get(this.endpoints.posts);
      return response.data;
    } catch (error) {
      console.error('Error fetching all posts:', error.message);
      throw error;
    }
  }

  async getPostComments(postId) {
    try {
      const response = await apiClient.get(
        this.endpoints.postComments.replace(':postId', postId)
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error.message);
      throw error;
    }
  }

  async getPostsWithCommentCount() {
    try {
      const posts = await this.getAllPosts();
      const postsWithComments = [];

      for (const post of posts.posts) {
        try {
          const comments = await this.getPostComments(post.id);
          postsWithComments.push({
            ...post,
            commentCount: comments.comments.length
          });
        } catch (error) {
          postsWithComments.push({
            ...post,
            commentCount: 0
          });
        }
      }

      return postsWithComments;
    } catch (error) {
      console.error('Error getting posts with comment count:', error.message);
      throw error;
    }
  }

  async getPopularPosts() {
    try {
      const postsWithComments = await this.getPostsWithCommentCount();
      
      // Find the maximum comment count
      const maxCommentCount = Math.max(...postsWithComments.map(post => post.commentCount));
      
      // Return all posts with the maximum comment count
      return postsWithComments
        .filter(post => post.commentCount === maxCommentCount)
        .sort((a, b) => b.id - a.id); // Sort by post ID in descending order
    } catch (error) {
      console.error('Error getting popular posts:', error.message);
      throw error;
    }
  }

  async getLatestPosts(limit = 5) {
    try {
      const posts = await this.getAllPosts();
      
      // Sort by post ID in descending order (assuming newer posts have higher IDs)
      // In a real implementation, we would sort by timestamp
      return posts.posts
        .sort((a, b) => b.id - a.id)
        .slice(0, limit);
    } catch (error) {
      console.error('Error getting latest posts:', error.message);
      throw error;
    }
  }
}

module.exports = new PostService();