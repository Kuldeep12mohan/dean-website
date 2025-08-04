import express from "express";
import Student from "../Models/Student.js";

const studentRouter = express.Router();

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

    res.status(200).json({ message: "Login successful", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

studentRouter.post("/signup", async (req, res) => {
  const { facultyNumber, dateOfBirth } = req.body;

  try {
    // Check if student already exists
    const existingStudent = await Student.findOne({ facultyNumber });

    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists" });
    }

    // Create and save new student
    const newStudent = new Student({
      facultyNumber,
      dateOfBirth: new Date(dateOfBirth),
    });

    await newStudent.save();

    res.status(201).json({ message: "Signup successful", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default studentRouter;
