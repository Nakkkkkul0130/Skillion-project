const express = require('express');
const { auth } = require('../middleware/auth');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { showAll } = req.query;
    const filter = showAll === 'true' ? {} : { status: 'published' };
    
    const courses = await Course.find(filter)
      .populate('creator', 'name')
      .select('-enrolledStudents');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.id, status: 'published' })
      .populate('creator', 'name')
      .populate('lessons');
    
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/lessons/:lessonId', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId).populate('course');
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const isEnrolled = lesson.course.enrolledStudents.includes(req.user._id);
    if (!isEnrolled) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    res.json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;