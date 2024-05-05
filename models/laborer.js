const mongoose = require('mongoose');

const laborerSchema = new mongoose.Schema({
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
    required: true,
  },
  name:{
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  skills: {
    type: [String],
    required: true,
  },
});

const Laborer = mongoose.model('Laborer', laborerSchema);

module.exports = Laborer;
