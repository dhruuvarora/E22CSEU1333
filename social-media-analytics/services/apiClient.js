const axios = require('axios');
require('dotenv').config();

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${process.env.API_TOKEN}`,
    'Content-Type': 'application/json',
    'x-api-key': process.env.API_KEY
  }
});

// Add request interceptor to ensure token is added to every request
apiClient.interceptors.request.use(
  config => {
    // Log the request for debugging
    console.log(`Making ${config.method.toUpperCase()} request to: ${config.baseURL}${config.url}`);
    console.log('With headers:', config.headers);
    
    // Always ensure Authorization header is present
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${process.env.API_TOKEN}`;
    }
    
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

module.exports = apiClient;