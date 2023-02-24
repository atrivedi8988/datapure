import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

function Signup() {
  const [formstate, setFormState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formstate,
      [name]: value,
    });
  };
  const handleSubmit = () => {
    axios.post("http://localhost:8080/create", formstate).then((res) => {
      alert("signup successfully");
    });
  };
  return (
    <VStack
      width={"40%"}
      margin="auto"
      mt={"50px"}
      boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"
      borderRadius={"20px"}
      p="10px"
      justifyContent={"center"}
      alignItems="center"
      gap={"30px"}
    >
      <Heading>Sign up</Heading>
      <FormControl isRequired>
        <Box>
          <FormLabel>FULL NAME</FormLabel>
          <Input type={"text"} name="name" onChange={handleChange} />
        </Box>
        <Box>
          <FormLabel>EMAIL</FormLabel>
          <Input type={"text"} name="email" onChange={handleChange} />
        </Box>
        <Box>
          <FormLabel>PASSWORD</FormLabel>
          <Input type={"text"} name="password" onChange={handleChange} />
        </Box>
      </FormControl>
      <Button onClick={handleSubmit}>Submit</Button>
      
    </VStack>
  );
}

export default Signup;
