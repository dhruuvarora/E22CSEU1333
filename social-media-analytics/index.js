require('dotenv').config();
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Social Media Analytics API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});