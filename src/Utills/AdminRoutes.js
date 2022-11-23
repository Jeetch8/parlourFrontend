import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
  let auth = localStorage.getItem("role") === "admin" ? true : false;
  return auth ? <Outlet /> : <Navigate to="/admin/adminnotvalid" />;
};

export default AdminRoutes;
