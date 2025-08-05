import express from "express";
import Student from "../Models/Student.js";
import { generateToken } from "../Middleware/auth.js";
import UploadedSheet from "../Models/UploadSheet.js";
import { verifyToken } from "../Middleware/auth.js";

const studentRouter = express.Router();

studentRouter.post("/signup", async (req, res) => {
  const { facultyNumber, dateOfBirth } = req.body;

  try {
    const existingStudent = await Student.findOne({ facultyNumber });

    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    const newStudent = new Student({
      facultyNumber,
      dateOfBirth: new Date(dateOfBirth),
    });

    await newStudent.save();

    res.status(201).json({
      message: "Signup successful",
      student: newStudent,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

studentRouter.post("/login", async (req, res) => {
  const { facultyNumber, dateOfBirth } = req.body;

  try {
    const student = await Student.findOne({ facultyNumber });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    if (
      new Date(student.dateOfBirth).toISOString().slice(0, 10) !== dateOfBirth
    ) {
      return res.status(401).json({ message: "Invalid Date of Birth" });
    }

    const token = generateToken(student._id);

    res.status(200).json({
      message: "Login successful",
      token,
      student: {
        _id: student._id,
        facultyNumber: student.facultyNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

studentRouter.get("/sheets",verifyToken, async (req, res) => {
  try {
    const sheets = await UploadedSheet.find()
      .sort({ createdAt: -1 }); // optional: newest first

    res.status(200).json({ sheets });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch sheets", error });
  }
});

export default studentRouter;
