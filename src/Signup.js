import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const initialvalue = {
  name: "",
  email: "",
  password: "",
  cnfpassword: "",
  id: Date.now(),
  roll: "",
  // standard: "",
};

const subjects = ["Maths", "English", "Science", "Gujarati"];

export default function Signup() {
  const [signData, setSignData] = useState(initialvalue);
  const [teacher, setTeacher] = useState([]);
  const [student, setStudent] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [studentSubject, setStudentSubject] = useState([]);
  // const [hobby, setHobby] = useState([]);

  //state for input
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordEroor, setPasswordError] = useState("");
  const [confirmPasswordEroor, setConfirmPasswordError] = useState("");
  const [rollError, setRollError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [selectError, setSelctError] = useState("");

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("teacher")) || [];
    setTeacher(storedSubjects);
  }, []);

  const handleStudentSubject = (e) => {
    const clone = [...studentSubject];
    console.log(clone);
    const index = clone.findIndex((x) => x === e.target.value);
    if (index === -1) {
      clone.push(e.target.value);
    } else {
      clone.splice(index, 1);
    }
    console.log(clone);
    setStudentSubject(clone);
    console.log(studentSubject);

    // console.log(hobby);
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setSignData({ ...signData, [name]: value });
  };

  const validateName = () => {
    if (!signData.name) {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!signData.email) {
      setEmailError("Email is required");
    } else if (!emailRegex.test(signData.email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };
  const validatePassword = () => {
    if (!signData.password) {
      setPasswordError("Password is required");
      return;
    } else if (signData.password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    } else {
      setPasswordError("");
      return;
    }
  };

  const validateConfirmPassword = () => {
    if (!signData.cnfpassword) {
      setConfirmPasswordError("Confirm password is required");
      return;
    } else if (signData.cnfpassword !== signData.password) {
      setConfirmPasswordError("Passwords do not match");
      return;
    } else {
      setConfirmPasswordError("");
      return;
    }
  };

  const validateRoll = () => {
    if (!signData.roll) {
      setRollError("Select a roll (Teacher or Student)");
    } else {
      setRollError("");
    }
  };

  const handleselect = () => {
    if (!selectedSubject) {
      setSelctError("Choose any one subject");
    } else {
      setSelctError("");
    }
  };

  const validateSubject = () => {
    if (studentSubject.length === 0) {
      setSubjectError("Select at least one subject");
    } else {
      setSubjectError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateName(); //onBlur functions.
    validateEmail();
    validatePassword();
    validateConfirmPassword();
    validateRoll();
    validateSubject();
    handleselect();

    //  {
    const teacherdata = JSON.parse(localStorage.getItem("teacher"));
    console.log(teacherdata, "data get from localStorage");
    const studentdata = JSON.parse(localStorage.getItem("student"));
    console.log(studentdata, "data get from localStorage ,studentdata");

    const match =
      // teacherdata.find((e) => e.email == signData?.email) &&
      studentdata.find((e) => e.email == signData?.email);

    if (match) {
      alert("This mail is already registred try another mail address. ");
    } else {
      if (signData.roll == "1") {
        if (
          !nameError &&
          !emailError &&
          signData.email &&
          signData.password == signData.cnfpassword &&
          !passwordEroor &&
          !confirmPasswordEroor &&
          !rollError &&
          !selectError
          // !subjectError
        ) {
          const obj = {
            ...signData,
            subject: selectedSubject,
            // hobby: studentSubject,
          };
          const user = teacher;
          user.push(obj);
          setTeacher(user);
          console.log(user);

          localStorage.setItem("teacher", JSON.stringify(user));
          setSignData({
            name: "",
            email: "",
            password: "",
            cnfpassword: "",
            roll: "",
            subject: "",
            id: Date.now(),
          });
          setSelectedSubject("");
        }
      } else {
        if (
          !nameError &&
          !emailError &&
          signData.email &&
          signData.password == signData.cnfpassword &&
          !passwordEroor &&
          !confirmPasswordEroor &&
          !rollError &&
          // !selectError
          !subjectError
        ) {
          const obj = {
            ...signData,
            // subject: selectedSubject,
            hobby: studentSubject,
          };
          const user = student;
          user.push(obj);
          setStudent(user);
          console.log(user);

          localStorage.setItem("student", JSON.stringify(user));
          setSignData({
            name: "",
            email: "",
            password: "",
            cnfpassword: "",
            roll: "",
            subject: "",
            id: Date.now(),
          });
          setSelectedSubject();
          // setStudentSubject();
          setStudentSubject([]);
        }
      }
    }
    // }
  };

  // const handleSubject = (e) => {
  //   const clone = [...subject];
  //   console.log(clone);
  //   const index = clone.findIndex((x) => x === e.target.value);
  //   if (index === -1) {
  //     clone.push(e.target.value);
  //   } else {
  //     clone.splice(index, 1);
  //   }
  //   // console.log(clone);
  //   setSubject(clone);
  // };

  return (
    <form onSubmit={handleSubmit}>
      <div className="con">
        <div className="card">
          <div className="card_title">
            <h1>Register Here</h1>

            {/* <span>
              Already have an account? <a href="login">Sign In</a>
            </span> */}
          </div>
          <div className="form">
            <div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                onChange={onChange}
                value={signData.name}
                onBlur={validateName}
                className="form-control mt-2 mb-2"
              />
              <span className="error">{nameError}</span>
            </div>
          </div>

          <div className="form">
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                onChange={onChange}
                value={signData.email}
                onBlur={validateEmail}
                className="form-control mt-2 mb-2"
              />
              <span className="error">{emailError}</span>
            </div>
          </div>

          <div className="form">
            <div>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                onChange={onChange}
                value={signData.password}
                onBlur={validatePassword}
                className="form-control mt-2 mb-2"
              />
              <span className="error">{passwordEroor}</span>
            </div>
          </div>

          <div className="form">
            <div>
              <input
                type="password"
                id="cnfpassword"
                name="cnfpassword"
                placeholder="Confirm Password"
                onChange={onChange}
                onBlur={validateConfirmPassword}
                value={signData.cnfpassword}
                className="form-control mt-2 mb-2"
              />
              <span className="error">{confirmPasswordEroor}</span>
            </div>
          </div>

          <div>
            <p style={{ marginBottom: "5px" }} className="hobby">
              Select Roll
            </p>

            <input
              type="radio"
              value="1"
              id="teacher"
              name="roll"
              checked={signData.roll === "1"}
              onChange={onChange}
              defaultChecked
              onBlur={validateRoll}
            />
            <label htmlFor="teacher">Teacher</label>

            <input
              type="radio"
              value="2"
              id="student"
              name="roll"
              checked={signData.roll === "2"}
              onChange={onChange}
              onBlur={validateRoll}
            />
            <label htmlFor="student">Student</label>
            <br></br>
            <span className="error">{rollError}</span>
          </div>

          {signData.roll == "1" && (
            <div>
              <label htmlFor="selectsubject">Select subject</label> <br></br>
              <select
                id="selectsubject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="" disabled>
                  Select a Subject
                </option>
                {subjects.map((subject) => (
                  <option
                    key={subject}
                    value={subject}
                    disabled={teacher.some((e) => e.subject === subject)}
                    onBlur={handleselect}
                  >
                    {subject}
                  </option>
                ))}
              </select>
              <br></br>
              <span className="error">{selectError}</span>
            </div>
          )}
          {signData.roll == "2" && (
            <div>
              <div>
                <p className="hobby">Select Your Subject.</p>
                <input
                  id="maths"
                  value="Maths"
                  type="checkbox"
                  onChange={handleStudentSubject}
                  className="checkbox"
                  checked={
                    studentSubject.findIndex((x) => x === "Maths") !== -1
                  }
                  //   value={hobby}
                  onBlur={validateSubject}
                />
                <label htmlFor="maths" className="checklabel">
                  {" "}
                  Maths{" "}
                </label>
              </div>
              <div>
                <input
                  id="english"
                  value="English"
                  type="checkbox"
                  onChange={handleStudentSubject}
                  className="checkbox"
                  checked={
                    studentSubject.findIndex((x) => x === "English") !== -1
                  }
                  onBlur={validateSubject}
                />
                <label htmlFor="english" className="checklabel">
                  {" "}
                  English{" "}
                </label>
              </div>
              <div>
                <input
                  id="gujarati"
                  value="Gujarati"
                  type="checkbox"
                  onChange={handleStudentSubject}
                  className="checkbox"
                  checked={
                    studentSubject.findIndex((x) => x === "Gujarati") !== -1
                  }
                  onBlur={validateSubject}
                />
                <label htmlFor="gujarati" className="checklabel">
                  {" "}
                  Gujarati{" "}
                </label>
              </div>
              <div>
                <input
                  id="science"
                  value="Science"
                  type="checkbox"
                  onChange={handleStudentSubject}
                  className="checkbox"
                  checked={
                    studentSubject.findIndex((x) => x === "Science") !== -1
                  }
                  onBlur={validateSubject}
                />
                <label htmlFor="science" className="checklabel">
                  {" "}
                  Science{" "}
                </label>
              </div>
              <br></br>
              <span className="error">{subjectError}</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary mt-3  ">
            Submit
          </button>

          <p className="mt-3 text-center">
            Log in as a teacher ?
            <span>
              <Link to="/login">from here</Link>
            </span>
          </p>
          <p className="text-center">
            Log in as a student ?
            <span>
              <Link to="/login-student">from here</Link>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
}
