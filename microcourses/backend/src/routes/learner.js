const express = require('express');
const { auth, requireRole } = require('../middleware/auth');
const User = require('../models/User');
const Course = require('../models/Course');
const Lesson = require('../models/Lesson');
const { generateCertificateHash } = require('../utils/generateCertificate');
const router = express.Router();

// Enroll in course
router.post('/enroll/:courseId', auth, async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.courseId, status: 'published' });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const user = await User.findById(req.user._id);
    if (user.enrolledCourses.includes(req.params.courseId)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    user.enrolledCourses.push(req.params.courseId);
    course.enrolledStudents.push(req.user._id);
    
    await user.save();
    await course.save();

    res.json({ message: 'Enrolled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark lesson as complete
router.post('/complete/:lessonId', auth, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId).populate('course');
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    const user = await User.findById(req.user._id);
    if (!user.enrolledCourses.includes(lesson.course._id)) {
      return res.status(403).json({ message: 'Not enrolled in this course' });
    }

    if (!user.completedLessons.includes(req.params.lessonId)) {
      user.completedLessons.push(req.params.lessonId);
      await user.save();
    }

    // Check if course is 100% complete
    const courseProgress = await getProgress(req.user._id, lesson.course._id);
    if (courseProgress.percentage === 100) {
      // Issue certificate
      const serialHash = generateCertificateHash(req.user._id, lesson.course._id, new Date());
      user.certificates.push({
        courseId: lesson.course._id,
        serialHash,
        issuedAt: new Date()
      });
      await user.save();
      return res.json({ message: 'Lesson completed! Certificate issued!', certificate: true });
    }

    res.json({ message: 'Lesson completed!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user progress
router.get('/progress', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('enrolledCourses')
      .populate('certificates.courseId');

    const progressData = [];
    for (const course of user.enrolledCourses) {
      const progress = await getProgress(req.user._id, course._id);
      progressData.push({
        course,
        ...progress
      });
    }

    res.json({ 
      progress: progressData,
      certificates: user.certificates
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Helper function to calculate progress
async function getProgress(userId, courseId) {
  const course = await Course.findById(courseId).populate('lessons');
  const user = await User.findById(userId);
  
  const totalLessons = course.lessons.length;
  const completedLessons = course.lessons.filter(lesson => 
    user.completedLessons.includes(lesson._id)
  ).length;
  
  return {
    totalLessons,
    completedLessons,
    percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  };
}

module.exports = router;