import React from "react";
import { Navigate } from "react-router-dom";

const Protection = ({ children }: { children: React.ReactNode }) => {
  if (false) {
    return <Navigate to="/register" />;
  }
  return <>{children}</>;
};

export default Protection;
