import { Button, HStack, Input } from "@chakra-ui/react";
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
  return (
    <HStack>
      <Input type={"text"} name="email" onChange={handleChange} />
      <Input type={"text"} name="password" onChange={handleChange} />
      <Button onClick={handleSubmit}>Submit</Button>
    </HStack>
  );
}

export default Login;
