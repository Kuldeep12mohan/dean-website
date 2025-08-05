import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/Home";
import StudentLogin from "../components/StudentLogin";
import Teacher from "../components/Teacher";
import StudentDashboard from "../components/StudentDashboard";
const App = ()=>{

  return(
    <Router>
      <Routes>
        <Route element={<Home/>} path="/"/>
        <Route element={<Login/>} path="/teacher-login"/>
        <Route element={<StudentLogin/>} path="/student-login"/>
        <Route element={<Teacher/>} path="/teacher-panel"/>
        <Route element={<StudentDashboard/>} path="/student-dashboard"/>

      </Routes>
    </Router>
  )

}

export default App;
