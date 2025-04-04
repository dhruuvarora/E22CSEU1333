// services/numbersService.js
const axios = require('axios');

if (!process.env.API_TOKEN) {
  require('dotenv').config();
}

// Store for numbers
let numberStore = {
  windowPrevState: [],
  windowCurrState: []
};

// API endpoints for different number types
const API_ENDPOINTS = {
  'p': `${process.env.TEST_SERVER_BASE_URL}/primes`,
  'f': `${process.env.TEST_SERVER_BASE_URL}/fibo`,
  'e': `${process.env.TEST_SERVER_BASE_URL}/even`,
  'r': `${process.env.TEST_SERVER_BASE_URL}/rand`
};

// Mock response for testing
const mockResponses = {
  'p': [2, 3, 5, 7, 11],
  'f': [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
  'e': [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
  'r': [4, 7, 12, 9, 3, 15, 2, 19, 8, 11]
};

// Service methods for fetching and processing numbers
const numbersService = {
  fetchNumbers: async (numberType) => {
    if (!API_ENDPOINTS[numberType]) {
      throw new Error(`Invalid number type: ${numberType}`);
    }
    
    try {
      const response = await axios.get(API_ENDPOINTS[numberType], {
        timeout: parseInt(process.env.REQUEST_TIMEOUT) || 5000,
        headers: {
          'Authorization': process.env.API_TOKEN
        }
      });
      
      if (response.data && response.data.numbers) {
        return response.data.numbers;
      }
      
      return [];
    } catch (error) {
      console.error(`Error fetching ${numberType} numbers:`, error.message);
      console.log(`Using mock data for ${numberType} numbers`);
      return mockResponses[numberType] || [];
    }
  },

  // Add unique numbers to store
  addUniqueNumbersToStore: (numbers) => {
    numberStore.windowPrevState = [...numberStore.windowCurrState];
    const uniqueNumbers = numbers.filter(num => !numberStore.windowCurrState.includes(num));
    
    const windowSize = parseInt(process.env.WINDOW_SIZE) || 10;
    
    // Update current state maintaining window size
    if (numberStore.windowCurrState.length + uniqueNumbers.length <= windowSize) {
      numberStore.windowCurrState = [...numberStore.windowCurrState, ...uniqueNumbers];
    } else {
      // window size excedded 
      const combinedNumbers = [...numberStore.windowCurrState, ...uniqueNumbers];
      numberStore.windowCurrState = combinedNumbers.slice(-windowSize);
    }
  },

  calculateAverage: (numbers) => {
    if (numbers.length === 0) return 0;
    
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return (sum / numbers.length).toFixed(2);
  },

  // Process the numbers workflow
  processNumbers: async (numberType) => {
    const fetchedNumbers = await numbersService.fetchNumbers(numberType);
    numbersService.addUniqueNumbersToStore(fetchedNumbers);
    
    // Calculate average
    const average = numbersService.calculateAverage(numberStore.windowCurrState);

    // response --> output
    return {
      windowPrevState: numberStore.windowPrevState,
      windowCurrState: numberStore.windowCurrState,
      numbers: fetchedNumbers,
      avg: parseFloat(average)
    };
  }
};

module.exports = numbersService;