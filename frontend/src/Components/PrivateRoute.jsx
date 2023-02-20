import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({children}) {
//   let token = localStorage.getItem("token") || null
// //   useEffect(()=>{
//     if(!token){
//         return <Navigate to="/"/>
//       }
// //   },[token])
  
  return children
}

export default PrivateRoute