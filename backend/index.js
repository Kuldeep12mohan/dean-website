import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./db/db.js";
import studentRouter from "./Routes/student.js";
import teacherRouter from "./Routes/teacher.js";
import { verifyToken } from "./Middleware/auth.js";

const PORT = 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

connectDB();

app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);

app.use('/downloads',verifyToken, express.static(path.join(__dirname, 'downloads')));

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
