const Laborer = require('../models/laborer');
const Agent = require('../models/agent');


exports.register = async (req, res) => {
  try {
    const { agentEmail, name, phone, latitude, longitude, skills } = req.body;

    // Check if the agent with the provided email exists
    const agent = await Agent.findOne({ username: agentEmail });
    if (!agent) {
      return res.status(400).send('Agent with the provided email does not exist.');
    }

    // Create a new laborer instance
    const laborer = new Laborer({ 
      agentId: agent._id, 
      name, 
      phone, 
      latitude, 
      longitude, 
      skills 
    });

    // Save the laborer to the database
    await laborer.save();
    res.status(201).send('Laborer registered successfully.');
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.findLaborers = async (req, res) => {
  try {
    const { latitude, longitude, requiredSkills } = req.body;
    const radius = 10; // 10km radius
    const laborers = await Laborer.find({
      skills: { $all: requiredSkills },
      latitude: { $gte: latitude - radius, $lte: latitude + radius },
      longitude: { $gte: longitude - radius, $lte: longitude + radius },
    });
    res.status(200).send(laborers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
