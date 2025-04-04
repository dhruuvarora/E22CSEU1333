const numbersService = require('../service/number.service');

const numbersController = {
  getNumbersByType: async (req, res) => {
    const numberType = req.params.numberid;
    
    // validating numbers typqe
    if (!['p', 'f', 'e', 'r'].includes(numberType)) {
      return res.status(400).json({ 
        error: 'Invalid number type. Use p (prime), f (fibonacci), e (even), or r (random)' 
      });
    }
    
    try {
      const result = await numbersService.processNumbers(numberType);
      res.json(result);
    } catch (error) {
      console.error('Error processing request:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = numbersController;