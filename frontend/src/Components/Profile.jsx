import React, { useEffect, useState } from 'react'
import {Box, Heading, HStack, VStack} from "@chakra-ui/react"
import axios from "axios"
function Profile() {
  const [userInfo,setUserInfo] = useState({})
  useEffect(()=>{
    
    axios.get("http://localhost:8080/profile").then((res)=>{
      setUserInfo(res.data)
    })
  },[])
  return(
    <>
    <VStack>
        <Heading>Name : {userInfo.name}</Heading>
        <Heading>Eamil : {userInfo.email}</Heading>
        <Heading>Password : {userInfo.password}</Heading>
        <Heading>Role : {userInfo.role}</Heading>
    </VStack>
    </>
  )
}

export default Profile