const apiClient = require('./apiClient');

class UserService {
  constructor() {
    this.endpoints = {
      users: '/users',
      userPosts: '/users/:userId/posts'
    };
  }

  async getAllUsers() {
    try {
      const response = await apiClient.get(this.endpoints.users);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error.message);
      throw error;
    }
  }

  async getUserPosts(userId) {
    try {
      const response = await apiClient.get(
        this.endpoints.userPosts.replace(':userId', userId)
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error.message);
      throw error;
    }
  }

  async getUserPostCounts() {
    try {
      const users = await this.getAllUsers();
      const userIds = Object.keys(users.users);
      const userPostCounts = {};
      
      for (const userId of userIds) {
        try {
          const posts = await this.getUserPosts(userId);
          userPostCounts[userId] = posts.posts.length;
        } catch (error) {
          console.error(`Error fetching posts for user ${userId}:`, error.message);
          userPostCounts[userId] = 0;
        }
      }
      
      return userPostCounts;
    } catch (error) {
      console.error('Error getting user post counts:', error.message);
      throw error;
    }
  }

  async getTopUsers(limit = 5) {
    try {
      const users = await this.getAllUsers();
      const userPostCounts = await this.getUserPostCounts();
      
      const topUsers = Object.entries(userPostCounts)
        .map(([userId, postCount]) => ({
          userId,
          name: users.users[userId],
          postCount
        }))
        .sort((a, b) => b.postCount - a.postCount)
        .slice(0, limit);
      
      return topUsers;
    } catch (error) {
      console.error('Error getting top users:', error.message);
      throw error;
    }
  }
}

module.exports = new UserService();