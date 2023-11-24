import React from "react";
import { Navigate } from "react-router-dom";

export default function Protected({ children }) {
  const protect = JSON.parse(localStorage.getItem("roll"));

  return (
    <>
      {protect == 1 ? (
        <> {children} </>
      ) : (
        <>
          <Navigate to="/" replace />
        </>
      )}
    </>
  );
}
