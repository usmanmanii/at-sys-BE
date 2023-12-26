const express = require('express')
const router = express.Router();
const timesheetController = require('../controllers/timesheetController')
const authenticateToken = require('../middleware/jwtmiddleware');

router.get('/generate-timesheet/:studentId', async (req, res) => {
    const studentId = req.params.studentId;  
    try {
      const timesheet = await timesheetController.generateTimeSheet(studentId);
      res.json({message:"Your time table ",timesheet});
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate timesheet.' });
    }
  });

router.get('/generate-timesheet',timesheetController.generateTimeSheet);
  module.exports=router