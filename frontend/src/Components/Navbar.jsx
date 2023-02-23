import { Box, HStack, Text } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { Link, Navigate } from "react-router-dom";

function Navbar() {
  return (
    <HStack
      justifyContent={"center"}
      alignItems="center"
      gap={"20px"}
      fontSize="lg"
      color={"white"}
      height="50px"
      bgColor={"teal.500"}
    >
      <Link to={"/signup"}>Sign up</Link>
      <Link to={"/"}>Login</Link>
      <Link to={"/profile"}>Profile</Link>
      <Text _hover={{cursor:"pointer"}} onClick={()=>{
       localStorage.removeItem("token")
       axios.defaults.headers.authorization = ""
      }}>Logout</Text>
      <Link to="/userlist">User List</Link>
      <Link to="/products">Products</Link>
    </HStack>
  );
}

export default Navbar;
