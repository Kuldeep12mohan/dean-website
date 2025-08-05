import express from 'express';
import multer from 'multer';
import xlsx from 'xlsx';
import Teacher from '../Models/Teacher.js';
import UploadedSheet from '../Models/UploadSheet.js';
import { generateToken,verifyToken } from '../Middleware/auth.js';

const teacherRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

teacherRouter.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingTeacher = await Teacher.findOne({ username });

    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher already exists' });
    }

    const newTeacher = new Teacher({ username, password });
    await newTeacher.save();

    res.status(201).json({
      message: 'Signup successful',
      teacher: newTeacher,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error during signup', error });
  }
});

teacherRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ username });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    if (teacher.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(teacher._id);

    res.status(200).json({
      message: 'Login successful',
      token,
      teacher: {
        _id: teacher._id,
        username: teacher.username,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

teacherRouter.post('/upload', verifyToken, upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }

  try {
    const teacherId = req.user.userId;
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    const uploadedSheet = new UploadedSheet({
      teacher: teacher._id,
      originalFileName: req.file.originalname,
      data: sheetData,
    });

    await uploadedSheet.save();

    res.status(201).json({
      message: 'Excel file uploaded and data saved successfully',
      uploadedSheet,
    });
  } catch (error) {
    console.error('Upload Error:', error);
    res.status(500).json({ message: 'Server error during upload', error });
  }
});

export default teacherRouter;
