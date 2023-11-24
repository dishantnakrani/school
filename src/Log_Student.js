import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Log_Student() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  // const userId = 451518;

  // const history = useHistory();

  const getdata = JSON.parse(localStorage.getItem("student"));

  useEffect(() => {
    setData(getdata);
  }, []);

  const handleSubmit = () => {
    console.log("object");
    const match = data.find(
      (cred) => cred.email === email && cred.password === password
    );
    console.log(match);

    if (match) {
      alert("Succesfull");
      localStorage.setItem("roll", match.roll);
      localStorage.setItem("userid", match.id);
      if (match.roll == "1") {
        navigate("/student-panel");
      } else {
        navigate(`/student-panel/${match.id}`);
        localStorage.setItem("logStudent", JSON.stringify(match));
      }
      // navigate("/sucess");
    } else {
      alert("Credencial doe'nt matched");
    }
  };
  return (
    <div
      // style={{
      //   height: "100vh",
      //   width: "100%",
      //   alignItems: "center",
      // }}
      className="con"
    >
      <div className="card">
        <div className="card_title">
          <h1>Log In </h1>
          {/* <span>
        Already have an account? <a href="login">Sign In</a>
      </span> */}
        </div>
        <div className="form">
          <input
            type="email"
            className="form-control mt-3 mb-3"
            name="email"
            placeholder="Email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            className="form-control mt-3 mb-3"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button onClick={handleSubmit} className="btn btn-primary mb-3 w-100">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}

export default Log_Student;
