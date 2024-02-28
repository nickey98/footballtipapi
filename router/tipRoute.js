// routes/tips.js
const express = require('express');
const router = express.Router();
const Tip = require('../model/tips');

// Get all tips
router.get('/finish', async (req, res) => {
  try {
    const tips = await Tip.find({finish: true}).populate('homeTeam awayTeam');
    res.json({data: tips});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//
router.get('/', async (req, res) => {
  try {
    const tips = await Tip.find({finish: false}).populate('homeTeam awayTeam');
    res.json({data: tips});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new tip
router.post('/', async (req, res) => {
  const tip = new Tip({
    homeTeam: req.body.homeTeam,
    awayTeam: req.body.awayTeam,
    league: req.body.league,
    round: req.body.round,
    tip: req.body.tip,
    time: req.body.time,
    date: req.body.date
  });

  try {
    const newTip = await tip.save();
    res.status(201).json(newTip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a tip
router.delete('/:id', getTip, async (req, res) => {
  try {
    await res.tip.remove();
    res.json({ message: 'Deleted Tip' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getTip(req, res, next) {
  try {
    tip = await Tip.findById(req.params.id);
    if (tip == null) {
      return res.status(404).json({ message: 'Tip not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.tip = tip;
  next();
}

// Update a tip
router.patch('/:id', async (req, res) => {
  try {
    const updatedTip = await Tip.findByIdAndUpdate(
      req.params.id,
      { isCorrect: req.body.isCorrect,
        finish: true
      },
      { new: true }
    );

    if (!updatedTip) {
      return res.status(404).json({ message: 'Tip not found' });
    }

    res.json(updatedTip);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
