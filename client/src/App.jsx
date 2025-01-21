import React from "react";
import { Button } from "./components/ui/button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/auth/auth.jsx";
import Chat from "./pages/chat/chat";
import Profile from "./pages/profile/Profile";

export default function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path ='/auth' element={<Auth/>}/>
      <Route path ='/chat' element={<Chat/>}/>
      <Route path ='/profile' element={<Profile/>}/>
      <Route path = '*' element= {<Navigate to= "/auth"/>}/>
    </Routes>
    </BrowserRouter>
  );
}
