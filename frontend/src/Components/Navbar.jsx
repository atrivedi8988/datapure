import { Box, HStack, Text } from "@chakra-ui/react";
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
      <Text onClick={()=>{
       localStorage.removeItem("token")
      }}>Logout</Text>
    </HStack>
  );
}

export default Navbar;
