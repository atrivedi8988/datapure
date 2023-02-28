import { Box, Button, Heading, Input } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";

function ResetPassword() {
  const [pass, setPass] = useState(null);
  const { id, token } = useParams();
  const handleReset = () => {
    // if (pass) {
      axios
        .patch(`http://localhost:8080/reset/${id}/${token}`, { password: pass })
        .then((res) => {
          console.log(res);
        });
    // }else{
    //     alert("you didn't fill the password")
    // }
  };
  return (
    <Box>
      <Heading>Reset Your Password</Heading>
      <Input
        type={"text"}
        placeholder={"Type your new password"}
        onChange={(e) => setPass(e.target.value)}
      />
      <Button onClick={handleReset}>Submit</Button>
    </Box>
  );
}

export default ResetPassword;
