import React, { useState, useEffect } from "react";
import Header from "./Header";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useNavigate } from "react-router";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function StudentPanel() {
  const [filterData, setFilterData] = useState([]);
  const [alldata, setAlldata] = useState([]);
  let [profileArr, setProfileArr] = useState([]);
  const [logStudent, setLogStudent] = useState([]);

  // this is for profile modals.
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  useEffect(() => {
    const lgstudent = JSON.parse(localStorage.getItem("logStudent"));
    setLogStudent(lgstudent);
  }, []);

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("roll");
    localStorage.removeItem("userid");
    localStorage.removeItem("logStudent");

    navigate("/login-student");
  };

  const profile = () => {
    handleShow1();
  };

  return (
    <div>
      <Header />
      <div className="d-flex justify-content-around">
        <h1 className="stu">Student Panel</h1>
        <div>
          <button
            data-tooltip-id="my-tooltip-1"
            onClick={profile}
            className="buttons"
          >
            <FaRegUser className="icons" />
          </button>
          <button
            data-tooltip-id="my-tooltip-2"
            onClick={logout}
            className="buttons"
            place="left"
          >
            <MdLogout className="icons" />
          </button>
        </div>
        <ReactTooltip
          variant="info"
          id="my-tooltip-1"
          place="left"
          content="Profile"
        />
        <ReactTooltip
          id="my-tooltip-2"
          variant="info"
          place="right"
          content="Logout"
        />
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Students's Profile.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h2>Name:{logStudent.name}</h2>
            <p>Email:{logStudent.email}</p>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
