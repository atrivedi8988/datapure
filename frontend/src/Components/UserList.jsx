import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserList() {
    const [users,setUsers] = useState([])

    const handleAllUsers = ()=>{
        axios.get("http://localhost:8080/allusers").then((res)=>{
            // console.log(res)
            setUsers(res.data.user)
        }).catch(err=>console.log(err.response.data))
    }

    const handleRole = (id)=>{
        console.log(id)
        axios.patch(`http://localhost:8080/assignadmin/${id}`,{role:"admin"}).then((res)=>{
            handleAllUsers()
        })
    }


    useEffect(()=>{
       handleAllUsers()

       
    },[])

    // useEffect(()=>{},[users])
    
  return (
    <>
    <Table>
        <Thead>
            <Tr>
                {/* <Th>ID</Th> */}
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Password</Th>
                <Th>Role</Th>
            </Tr>
        </Thead>
        <Tbody>
            {
                users.map((el)=>{
                    return <Tr>
                        {/* <Td>{el.id}</Td> */}
                        <Td>{el.name}</Td>
                        <Td>{el.email}</Td>
                        <Td>{el.password}</Td>
                        <Td _hover={{cursor:"pointer"}} onClick={()=>handleRole(el._id)}>{el.role}</Td>
                    </Tr>
                })
            }
        </Tbody>
    </Table>
    </>
  )
}

export default UserList