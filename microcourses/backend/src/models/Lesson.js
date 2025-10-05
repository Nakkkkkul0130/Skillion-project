const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  videoUrl: String,
  transcript: String,
  order: { type: Number, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  duration: Number // in minutes
}, { timestamps: true });

// Ensure unique order within a course
lessonSchema.index({ course: 1, order: 1 }, { unique: true });

module.exports = mongoose.model('Lesson', lessonSchema);