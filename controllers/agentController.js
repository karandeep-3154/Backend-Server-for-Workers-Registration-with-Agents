const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Agent = require('../models/agent');

exports.register = async (req, res) => {
  try {
    const { name, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const agent = new Agent({ name, username, password: hashedPassword });
    await agent.save();
    res.status(201).send('Agent registered successfully.');
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const agent = await Agent.findOne({ username });
    if (!agent) {
      throw new Error('Agent not found.');
    }
    const isMatch = await bcrypt.compare(password, agent.password);
    if (!isMatch) {
      throw new Error('Invalid login credentials.');
    }
    const token = jwt.sign({ _id: agent._id }, 'secretkey');
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
