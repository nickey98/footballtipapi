const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const router = express.Router();
require('dotenv').config();
const authMiddleware = require('../middleware/authMiddleware');
const ApiResponse = require('../utils/apiResponse.js'); // adjust path as needed

const SECRET_KEY = process.env.SECRET_KEY;

// ➕ Create new user
router.post('/', async (req, res) => {
  try {
    const { name, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, password: hashedPassword });
    await newUser.save();

    const userData = { name: newUser.name, coins: newUser.coins };
    res.status(201).json(ApiResponse.success('User created', userData, 201));
  } catch (err) {
    res.status(400).json(ApiResponse.error('Failed to create user', err.message, 400));
  }
});

// 📥 Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(ApiResponse.success('Users fetched successfully', users));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to fetch users', err.message, 500));
  }
});

// 🔍 Get user by ID
router.get('/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json(ApiResponse.error('User not found', null, 404));
    }
    res.json(ApiResponse.success('User fetched successfully', user));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to fetch user', err.message, 500));
  }
});

// ✏️ Update user
router.put('/:id', async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
    res.json(ApiResponse.success('User updated successfully', updatedUser));
  } catch (err) {
    res.status(400).json(ApiResponse.error('Failed to update user', err.message, 400));
  }
});

// ❌ Delete user
router.delete('/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json(ApiResponse.success('User deleted successfully', null));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Failed to delete user', err.message, 500));
  }
});

// 🔐 Login user
router.post('/login', async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json(ApiResponse.error('User not found', null, 404));
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json(ApiResponse.error('Invalid password', null, 401));
    }

    const token = jwt.sign(
      { userId: user._id, name: user.name },
      SECRET_KEY,
      { expiresIn: '30d' }
    );

    res.json(ApiResponse.success('Login successful', { token }));
  } catch (err) {
    res.status(500).json(ApiResponse.error('Login failed', err.message, 500));
  }
});

module.exports = router;
