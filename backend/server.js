// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/dooh_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Models
const Campaign = mongoose.model('Campaign', {
  name: String,
  status: String,
  startDate: Date,
  endDate: Date,
  budget: Number
});

const Media = mongoose.model('Media', {
  name: String,
  type: String,
  url: String,
  uploadDate: Date
});

const Schedule = mongoose.model('Schedule', {
  totemId: String,
  mediaId: String,
  startTime: String,
  endTime: String,
  status: String
});

// Rotas para Campanhas
app.get('/api/campaigns', async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/campaigns', async (req, res) => {
  const campaign = new Campaign(req.body);
  try {
    const newCampaign = await campaign.save();
    res.status(201).json(newCampaign);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rotas para Mídia
app.get('/api/media', async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/media', async (req, res) => {
  const media = new Media(req.body);
  try {
    const newMedia = await media.save();
    res.status(201).json(newMedia);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Rotas para Programação
app.get('/api/schedules', async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/schedules', async (req, res) => {
  const schedule = new Schedule(req.body);
  try {
    const newSchedule = await schedule.save();
    res.status(201).json(newSchedule);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
