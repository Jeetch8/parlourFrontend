import { Routes, Outlet, Navigate } from "react-router-dom";
import React from "react";

const AdminRoutes = () => {
  const userExist = localStorage.getItem("accesstoken") ? true : false;
  return (
    {userExist?null:
      <Navigate to={"/admin/login"} replace />

    }
  );
};

export default AdminRoutes;
