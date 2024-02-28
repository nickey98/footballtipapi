const express = require('express');
const router = express.Router();
const Team = require('../model/team');

router.post('/', async (req, res) => {
    const team = new Team({
      name: req.body.name,
      logo: req.body.logo
    });
  
    try {
      const newTeam = await team.save();
      res.status(201).json(newTeam);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  router.get('/',async(req,res)=> {
    const team = await Team.find();
    res.json({data: team});
  });
  
  module.exports = router;