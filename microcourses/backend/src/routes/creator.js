const express = require('express');
const { auth, requireRole } = require('../middleware/auth');
const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const router = express.Router();

router.post('/apply', auth, async (req, res) => {
  try {
    if (req.user.role === 'creator') {
      return res.status(400).json({ message: 'Already a creator' });
    }
    
    const { phone, expertise, experience, motivation } = req.body;
    
    await User.findByIdAndUpdate(req.user._id, { 
      creatorStatus: 'pending',
      creatorApplication: {
        phone,
        expertise,
        experience,
        motivation,
        appliedAt: new Date()
      }
    });
    
    res.json({ message: 'Creator application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/dashboard', auth, requireRole(['creator']), async (req, res) => {
  try {
    const courses = await Course.find({ creator: req.user._id }).populate('lessons');
    res.json({ courses });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/courses', auth, requireRole(['creator']), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const course = new Course({
      title,
      description,
      category,
      creator: req.user._id
    });
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/courses/:courseId/lessons', auth, requireRole(['creator']), async (req, res) => {
  try {
    const { title, content, videoUrl, order } = req.body;
    const { courseId } = req.params;

    const course = await Course.findOne({ _id: courseId, creator: req.user._id });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const lesson = new Lesson({
      title,
      content,
      videoUrl,
      order,
      course: courseId,
      transcript: `Auto-generated transcript for: ${title}`
    });

    await lesson.save();
    course.lessons.push(lesson._id);
    course.totalLessons = course.lessons.length;
    await course.save();

    res.status(201).json(lesson);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Lesson order must be unique within course' });
    }
    res.status(500).json({ message: error.message });
  }
});

router.patch('/courses/:courseId/submit', auth, requireRole(['creator']), async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.courseId, creator: req.user._id },
      { status: 'pending' },
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