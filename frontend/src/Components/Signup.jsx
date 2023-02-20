import { Button, HStack, Input } from "@chakra-ui/react";
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
    <HStack>
      <Input type={"text"} name="name" onChange={handleChange} />
      <Input type={"text"} name="email" onChange={handleChange} />
      <Input type={"text"} name="password" onChange={handleChange} />
      <Button onClick={handleSubmit}>Submit</Button>
    </HStack>
  );
}

export default Signup;
