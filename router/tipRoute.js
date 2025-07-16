const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Tip = require('../model/tips');
const League = require('../model/league');
const ApiResponse = require('../utils/apiResponse.js'); // adjust path if needed

// GET finished tips
router.get('/finish', async (req, res) => {
  try {
    const tips = await Tip.find({ finish: true })
      .populate('homeTeam awayTeam league')
      .sort({ date: 1, time: 1 });
    res.json(ApiResponse.success('Finished tips fetched successfully', tips));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to fetch finished tips', err.message, 500));
  }
});

// GET all tips or filter by league
router.get('/', async (req, res) => {
  try {
    const { league } = req.query;
    const filter = { finish: false };

    if (league) {
      if (!mongoose.Types.ObjectId.isValid(league)) {
        return res.status(400).json(ApiResponse.error('Invalid league ID format', null, 400));
      }
      filter.league = league;
    }

    const tips = await Tip.find(filter)
      .populate('homeTeam awayTeam league')
      .sort({ date: 1, time: 1 });

    res.json(ApiResponse.success('Tips fetched successfully', tips));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to fetch tips', err.message, 500));
  }
});

// POST create a new tip
router.post('/', async (req, res) => {
  try {
    const { homeTeam, awayTeam, league, round, tip, time, date } = req.body;

    const newTip = new Tip({
      homeTeam,
      awayTeam,
      league,
      round,
      tip,
      time,
      date
    });

    const savedTip = await newTip.save();
    res.status(201).json(ApiResponse.success('Tip created successfully', savedTip, 201));
  } catch (err) {
    res.status(400).json(ApiResponse.error('Failed to create tip', err.message, 400));
  }
});

// PATCH update a tip by ID
router.patch('/:id', async (req, res) => {
  const { isCorrect, score } = req.body;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json(ApiResponse.error('Invalid Tip ID', null, 400));
  }

  try {
    const updatedTip = await Tip.findByIdAndUpdate(
      req.params.id,
      { isCorrect, score, finish: true },
      { new: true }
    );

    if (!updatedTip) {
      return res.status(404).json(ApiResponse.error('Tip not found', null, 404));
    }

    res.json(ApiResponse.success('Tip updated successfully', updatedTip));
  } catch (err) {
    res.status(400).json(ApiResponse.error('Failed to update tip', err.message, 400));
  }
});

// DELETE a tip by ID
router.delete('/:id', getTip, async (req, res) => {
  try {
    await res.tip.remove();
    res.json(ApiResponse.success('Tip deleted successfully', res.tip));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to delete tip', err.message, 500));
  }
});

// Middleware: get tip by ID
async function getTip(req, res, next) {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json(ApiResponse.error('Invalid Tip ID', null, 400));
  }

  try {
    const tip = await Tip.findById(id);
    if (!tip) {
      return res.status(404).json(ApiResponse.error('Tip not found', null, 404));
    }
    res.tip = tip;
    next();
  } catch (err) {
    return res.status(500).json(ApiResponse.error('Failed to retrieve tip', err.message, 500));
  }
}

module.exports = router;
