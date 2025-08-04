import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/Home";
import StudentLogin from "../components/StudentLogin";
const App = ()=>{

  return(
    <Router>
      <Routes>
        <Route element={<Home/>} path="/"/>
        <Route element={<Login/>} path="/teacher-login"/>
        <Route element={<StudentLogin/>} path="/student-login"/>
      </Routes>
    </Router>
  )

}

export default App;
