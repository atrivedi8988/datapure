import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import ProductPage from "./Components/ProductPage";
import Profile from "./Components/Profile";
import Signup from "./Components/Signup";
import UserList from "./Components/UserList";

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
      <Route path="/userlist" element={<UserList/>}/>
      <Route path="/products" element={<ProductPage/>}/>
    </Routes>
  );
}

export default AllRoutes;
