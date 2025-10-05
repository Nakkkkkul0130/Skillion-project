const express = require('express');
const { auth, requireRole } = require('../middleware/auth');
const User = require('../models/User');
const Course = require('../models/Course');
const router = express.Router();

router.get('/creators/pending', auth, requireRole(['admin']), async (req, res) => {
  try {
    const pendingCreators = await User.find({ creatorStatus: 'pending' });
    res.json(pendingCreators);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/creators/:userId/status', auth, requireRole(['admin']), async (req, res) => {
  try {
    const { status } = req.body;
    const updateData = { creatorStatus: status };
    
    if (status === 'approved') {
      updateData.role = 'creator';
    }

    const user = await User.findByIdAndUpdate(req.params.userId, updateData, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/courses/pending', auth, requireRole(['admin']), async (req, res) => {
  try {
    const courses = await Course.find({ status: 'pending' })
      .populate('creator', 'name email')
      .populate('lessons');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/courses/:courseId/status', auth, requireRole(['admin']), async (req, res) => {
  try {
    const { status } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.courseId,
      { status },
      { new: true }
    );
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;