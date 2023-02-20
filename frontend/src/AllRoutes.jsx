import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AllRoutes;