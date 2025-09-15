import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";

export default function MainLayout() {
  return (
    <div>
      <ProtectedRoutes>
        <Navbar />
      </ProtectedRoutes>
      <Outlet />
    </div>
  );
}
