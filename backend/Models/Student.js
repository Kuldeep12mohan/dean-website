import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  facultyNumber: {
    type: String,
    required: true,
    unique: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
}, {
  timestamps: true
});

const Student = mongoose.model('Student', studentSchema);

export default Student;
