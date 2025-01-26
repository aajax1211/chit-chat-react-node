import { useAppStore } from "@/store/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Chat() {

  const {userInfo} = useAppStore()
  const navigate = useNavigate()

  useEffect(()=>{
    if(!userInfo.profile){
      toast("Please setup profile to continue")
      navigate("/profile");
    }
  },[userInfo,navigate])

  return <div>Chat</div>;
}
