import React, { useState, useEffect } from "react";
import Headers from "./Header";
import { useParams, useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function TeacherPanel() {
  const [student, setStudent] = useState([]);
  const [logTeacher, setLogTeacher] = useState([]);
  const [filterStudent, setFilterStudent] = useState([]);

  //bootrap modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  useEffect(() => {
    const lgteacher = JSON.parse(localStorage.getItem("logTeacher"));
    const studentLocal = JSON.parse(localStorage.getItem("student"));
    setStudent(studentLocal);
    setLogTeacher(lgteacher);
  }, []);

  useEffect(() => {
    if (student.length > 0 && logTeacher.subject) {
      setFilterStudent(
        student.filter((student) => student.hobby.includes(logTeacher.subject)) //this includes (js method ) check students multiple subject to one teacher's subject.
      );
    }
  }, [student, logTeacher.subject]);

  const getParticularStudent = () => {};
  console.log(filterStudent);

  const logout = () => {
    localStorage.removeItem("logTeacher");
    localStorage.removeItem("roll");
    localStorage.removeItem("userid");

    navigate("/login");
  };

  const profile = () => {
    handleShow();
  };

  return (
    <>
      <Headers />
      <div className="container d-flex justify-content-around">
        <h1 className="teacher">Teacher Panel</h1>
        <div>
          <button className="buttons m-2 p-2">
            <CgProfile onClick={profile} className="buttons-size" />
          </button>
          <button onClick={logout} className="buttons m-2 p-2">
            <FiLogOut className="buttons-size" />
          </button>
        </div>
      </div>
      {/* {filterStudent.map((st) => {
        return <div key={st.id}>{st.name}</div>;
      })} */}
      <div className="container">
        <table>
          <tr style={{ backgroundColor: "#ddddbb" }}>
            <th>Name</th>
            <th>Email</th>
            <th>Preferd Subject</th>
          </tr>

          <tbody>
            {filterStudent.map((student) => {
              return (
                <tr key={student.id}>
                  <td className="namee">{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.hobby.join(",")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Teacher Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Name:{logTeacher.name}</h2>
            <p>Email:{logTeacher.email}</p>
            Teacher of
            <ul>
              <li>{logTeacher.subject}</li>
            </ul>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}

export default TeacherPanel;
