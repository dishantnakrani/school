import "./App.css";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Signup from "./Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Protected from "./Protected";
import Log from "./Log";
import Sucess from "./Sucess";
import TeacherPanel from "./TeacherPanel";
import StudentPanel from "./StudentPanel";
import Protechted_stu from "./Protechted_stu";
import Log_Student from "./Log_Student";
import Pagenotfound from "./Pagenotfound";

function App() {
  let { id } = useParams();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Log />} />
          <Route path="/login-student" element={<Log_Student />} />
          <Route path="*" element={<Pagenotfound />} />

          <Route
            path="/sucess"
            element={
              <Protected>
                <Sucess />
              </Protected>
            }
          />
          <Route
            path="/teacher-panel/:id"
            element={
              <Protected>
                <TeacherPanel />
              </Protected>
            }
          />
          <Route
            path="/student-panel/:id"
            element={
              <Protechted_stu>
                <StudentPanel />
              </Protechted_stu>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
