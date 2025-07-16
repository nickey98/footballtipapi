const express = require('express');
const router = express.Router();
const Team = require('../model/team');
const League = require('../model/league');
const ApiResponse = require('../utils/apiResponse.js'); // adjust path if needed

// ➕ Create a new team
router.post('/', async (req, res) => {
  try {
    const { name, league } = req.body;

    const leagueExists = await League.findById(league);
    if (!leagueExists) {
      return res.status(404).json(ApiResponse.error('League not found', null, 404));
    }

    const team = new Team({ name, league });
    const savedTeam = await team.save();
    res.status(201).json(ApiResponse.success('Team created successfully', savedTeam, 201));
  } catch (err) {
    res.status(400).json(ApiResponse.error('Failed to create team', err.message, 400));
  }
});

// 📥 Get all teams (with league data)
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find().populate('league');
    res.json(ApiResponse.success('Teams fetched successfully', teams));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to fetch teams', err.message, 500));
  }
});

// 🔍 Get a single team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate('league');
    if (!team) {
      return res.status(404).json(ApiResponse.error('Team not found', null, 404));
    }
    res.json(ApiResponse.success('Team fetched successfully', team));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to fetch team', err.message, 500));
  }
});

// ✏️ Update a team
router.put('/:id', async (req, res) => {
  try {
    const { name, league } = req.body;

    const leagueExists = await League.findById(league);
    if (!leagueExists) {
      return res.status(404).json(ApiResponse.error('League not found', null, 404));
    }

    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { name, league },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json(ApiResponse.error('Team not found', null, 404));
    }

    res.json(ApiResponse.success('Team updated successfully', updatedTeam));
  } catch (err) {
    res.status(400).json(ApiResponse.error('Failed to update team', err.message, 400));
  }
});

// ❌ Delete a team
router.delete('/:id', async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json(ApiResponse.error('Team not found', null, 404));
    }

    res.json(ApiResponse.success('Team deleted successfully', deletedTeam));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to delete team', err.message, 500));
  }
});

module.exports = router;
