import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth/auth.jsx";
import Chat from "./pages/chat/chat";
import Profile from "./pages/profile/Profile";
import { useAppStore } from "./store/store";
import 'react-loading-skeleton/dist/skeleton.css'
import { apiClient } from "./lib/api-client";
import { GET_USER_INFO} from "./utils/constants";
import Loader from "./components/loader";

const PrivateRoute = ({children}) =>{
  const {userInfo} = useAppStore()
  const isAuthenticated = !!userInfo

  return isAuthenticated ? children : <Navigate to= "/auth" />;

}

const AuthRoute = ({children}) =>{
  const {userInfo} = useAppStore()
  const isAuthenticated = !!userInfo

  return isAuthenticated ? <Navigate to= "/chat" /> : children ;

}




export default function App() {

  const {userInfo, setUserInfo} = useAppStore()

  const [loading , setLoading] = useState(true)


  useEffect(()=>{
    const getUserData = async () =>{
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials :true
        })
        if(response.status === 200 && response.data.id){
          setUserInfo(response.data)
        }else{
          setUserInfo(undefined)
        }
        console.log(response.data)
        
      } catch (error) {
        console.log(error)
        setUserInfo(undefined)
      }finally{
        setLoading(false)
      }
    }
    
    if(!userInfo){
      getUserData()
    }else {
      setLoading(false)
    }
  },[userInfo, setUserInfo])

  if(loading){
    return (
      <Loader loading = {loading}></Loader>
    )
  }


  return (
    <BrowserRouter>
    <Routes>
      <Route path ='/auth' element={<AuthRoute><Auth/></AuthRoute>}/>
      <Route path ='/chat' element={<PrivateRoute><Chat/></PrivateRoute>}/>
      <Route path ='/profile' element={<PrivateRoute><Profile/></PrivateRoute>}/>
      <Route path = '*' element= {<Navigate to= "/auth"/>}/>
    </Routes>
    </BrowserRouter>
  );
}
