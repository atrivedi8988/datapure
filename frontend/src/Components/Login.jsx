import { Box, Button, FormControl, FormLabel, Heading, HStack, Input, Text, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [formstate, setFormState] = useState({
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
    axios.post("http://localhost:8080/login", formstate,).then((res)=>{
        localStorage.setItem("token",res.data.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`
        alert("login successfully")
    })
    
  };

  const handleForgotPassword = ()=>{
    axios.post("http://localhost:8080/forgot", {email : formstate.email}).then((res)=>{
      console.log(res)
  })
  }
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
    >
      <Heading>Login</Heading>
      <FormControl isRequired>
        
        <Box mb={"20px"}>
          <FormLabel>EMAIL</FormLabel>
          <Input type={"text"} name="email" onChange={handleChange} />
        </Box>
        <Box>
          <FormLabel>PASSWORD</FormLabel>
          <Input type={"text"} name="password" onChange={handleChange} />
        </Box>
      </FormControl>
      <Box color={"blue"} width="100%" _hover={{cursor:"pointer",textDecor:"underline"}}>
        <Text onClick={handleForgotPassword} textAlign={"right"}>forgot password</Text>
      </Box>
      <Button onClick={handleSubmit}>Submit</Button>
    </VStack>
  );
}

export default Login;
