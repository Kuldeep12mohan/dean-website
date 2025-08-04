import express from "express"
import cors from "cors"
import connectDB from "./db/db.js";
import studentRouter from "./Routes/student.js";
import teacherRouter from "./Routes/teacher.js";

const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

connectDB();


app.use('/student',studentRouter);
app.use('/teacher',teacherRouter);


app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})