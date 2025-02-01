import { useAppStore } from "@/store/store";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactContainer from "./chat-components/contact-container/ContactContainer";
import EmptyChatContainer from "./chat-components/empty-chat-container/EmptyChatContainer";
import ChatContainer from "./chat-components/chat-container/ChatContainer";

export default function Chat() {

  const {userInfo} = useAppStore()
  const navigate = useNavigate()

  useEffect(()=>{
    if(!userInfo.profileSetup){
      toast("Please setup profile to continue")
      navigate("/profile");
    }
  },[userInfo,navigate])

  return <div className="flex h-[100vh] text-white overflow-hidden">
    <ContactContainer />
    {/* <EmptyChatContainer /> */}
    <ChatContainer />
  </div>;
}