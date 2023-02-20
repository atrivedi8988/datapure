import React, { useEffect } from 'react'
import {Box} from "@chakra-ui/react"
import axios from "axios"
function Profile() {
  useEffect(()=>{
    
    axios.get("http://localhost:8080/profile").then((res)=>{
      console.log(res.data)
    })
  },[])
  return(
    <>
    <Box>

    </Box>
    </>
  )
}

export default Profile