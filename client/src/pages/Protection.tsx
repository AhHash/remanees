import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protection = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((store: any) => store.user);

  if (!user) {
    return <Navigate to="/register" />;
  }

  return <>{children}</>;
};

export default Protection;
