const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
});

const Agent = mongoose.model('Agent', agentSchema);

module.exports = Agent;
