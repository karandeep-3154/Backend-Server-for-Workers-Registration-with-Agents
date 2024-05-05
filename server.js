const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const agentController = require('./controllers/agentController');
const laborerController = require('./controllers/laborerController');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect(process.env.MONGODB_URL);

// Middleware
app.use(bodyParser.json());

// Agent routes
app.post('/register', agentController.register);
app.post('/login', agentController.login);

// Laborer routes
app.post('/register-laborer', laborerController.register);
app.post('/find-laborers', laborerController.findLaborers);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
