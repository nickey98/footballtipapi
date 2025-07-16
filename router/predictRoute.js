const express = require('express');
const router = express.Router();
const Predict = require('../models/Predict');
const ApiResponse = require('../utils/ApiResponse'); // adjust path if needed

// Create a new prediction
router.post('/', async (req, res) => {
  try {
    const { tip, userId } = req.body;
    const predict = new Predict({ tip, userId });
    const savedPredict = await predict.save();
    res.status(201).json(ApiResponse.success('Prediction created successfully', savedPredict, 201));
  } catch (err) {
    res.status(400).json(ApiResponse.error('Failed to create prediction', err.message, 400));
  }
});

// Get all predictions (optionally populate tip)
router.get('/', async (req, res) => {
  try {
    const predictions = await Predict.find().populate('tip');
    res.json(ApiResponse.success('Predictions fetched successfully', predictions));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to fetch predictions', err.message, 500));
  }
});

// Get prediction by ID
router.get('/:id', async (req, res) => {
  try {
    const prediction = await Predict.findById(req.params.id).populate('tip');
    if (!prediction) {
      return res.status(404).json(ApiResponse.error('Prediction not found', null, 404));
    }
    res.json(ApiResponse.success('Prediction fetched successfully', prediction));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to fetch prediction', err.message, 500));
  }
});

// Update a prediction (e.g., update userId or tip)
router.put('/:id', async (req, res) => {
  try {
    const { tip, userId } = req.body;
    const updatedPrediction = await Predict.findByIdAndUpdate(
      req.params.id,
      { tip, userId },
      { new: true }
    );
    if (!updatedPrediction) {
      return res.status(404).json(ApiResponse.error('Prediction not found', null, 404));
    }
    res.json(ApiResponse.success('Prediction updated successfully', updatedPrediction));
  } catch (err) {
    res.status(400).json(ApiResponse.error('Failed to update prediction', err.message, 400));
  }
});

// Delete a prediction
router.delete('/:id', async (req, res) => {
  try {
    const deletedPrediction = await Predict.findByIdAndDelete(req.params.id);
    if (!deletedPrediction) {
      return res.status(404).json(ApiResponse.error('Prediction not found', null, 404));
    }
    res.json(ApiResponse.success('Prediction deleted successfully', deletedPrediction));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to delete prediction', err.message, 500));
  }
});

module.exports = router;
