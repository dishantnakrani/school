import React from "react";
import { Navigate } from "react-router-dom";

export default function Protechted_stu({ children }) {
  const protect = JSON.parse(localStorage.getItem("roll"));

  //this for student

  return (
    <>
      {protect == 2 ? (
        <> {children} </>
      ) : (
        <>
          <Navigate to="/" replace />
        </>
      )}
    </>
  );
}
