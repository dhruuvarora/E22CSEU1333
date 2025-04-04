require('dotenv').config();
const express = require('express');
const app = express()
const numberRoutes = require("./routes/number.routes");
const port = process.env.PORT || 8000;

// check is server is up and running
app.use('/health', (req, res) => {
  res.status(200).send('Service is up and running')
})

// Routes
app.use('/numbers', numberRoutes)

// port for the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});