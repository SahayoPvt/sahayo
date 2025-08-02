import { Loader } from 'lucide-react';
import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router'
function ProtectedRoute({element,adminOnly=false}) {
    const {isAuthenticated,loading,user}=useSelector(state=>state.user);
    if(loading){
        return <Loader/>
    }

    if(!isAuthenticated){
        return <Navigate to="/sign-in"/>
    }
    if(adminOnly && user.role!=='admin'){
        return <Navigate to="/"/>
    }
  return element
}

export default ProtectedRoute