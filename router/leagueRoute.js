const express = require('express');
const router = express.Router();
const League = require('../model/league');
const ApiResponse = require('../utils/ApiResponse'); // Adjust path as needed

// Create a new league
router.post('/create', async (req, res) => {
  try {
    const league = new League({ name: req.body.name });
    const savedLeague = await league.save();
    res.status(201).json(ApiResponse.success('League created successfully', savedLeague, 201));
  } catch (err) {
    res.status(400).json(ApiResponse.error('Failed to create league', err.message, 400));
  }
});

// Get all leagues
router.get('/', async (req, res) => {
  try {
    const leagues = await League.find();
    res.json(ApiResponse.success('Leagues fetched successfully', leagues));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to fetch leagues', err.message, 500));
  }
});

// Get a league by ID
router.get('/:id', async (req, res) => {
  try {
    const league = await League.findById(req.params.id);
    if (!league) {
      return res.status(404).json(ApiResponse.error('League not found', null, 404));
    }
    res.json(ApiResponse.success('League fetched successfully', league));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to fetch league', err.message, 500));
  }
});

// Update a league
router.put('/:id', async (req, res) => {
  try {
    const updatedLeague = await League.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true }
    );
    if (!updatedLeague) {
      return res.status(404).json(ApiResponse.error('League not found', null, 404));
    }
    res.json(ApiResponse.success('League updated successfully', updatedLeague));
  } catch (err) {
    res.status(400).json(ApiResponse.error('Failed to update league', err.message, 400));
  }
});

// Delete a league
router.delete('/:id', async (req, res) => {
  try {
    const deletedLeague = await League.findByIdAndDelete(req.params.id);
    if (!deletedLeague) {
      return res.status(404).json(ApiResponse.error('League not found', null, 404));
    }
    res.json(ApiResponse.success('League deleted successfully', deletedLeague));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to delete league', err.message, 500));
  }
});

module.exports = router;
