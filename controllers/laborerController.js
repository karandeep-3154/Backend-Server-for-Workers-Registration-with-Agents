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

    // Convert radius to degrees
    const radiusInDegrees = radius / 111;

    // Calculate the latitude range
    const minLat = latitude - radiusInDegrees;
    const maxLat = latitude + radiusInDegrees;

    // Calculate the longitude range
    const minLng = longitude - (radiusInDegrees / Math.cos(latitude * Math.PI / 180));
    const maxLng = longitude + (radiusInDegrees / Math.cos(latitude * Math.PI / 180));

    // Query the database to find laborers within the calculated range
    const laborers = await Laborer.find({
      skills: { $all: requiredSkills },
      latitude: { $gte: minLat, $lte: maxLat },
      longitude: { $gte: minLng, $lte: maxLng },
    });

    res.status(200).send(laborers);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
