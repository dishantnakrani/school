import React from "react";
import { useNavigate } from "react-router";

export default function Sucess() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("roll");
    // localStorage.removeItem("alldata");
    navigate("/");
  };
  return (
    <div className="container">
      <div className="card">
        <div className="card_title">
          <h1>Log In Sucessfull.</h1>
          <button onClick={logout} className="btn btn-danger mt-3 mb-3">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
