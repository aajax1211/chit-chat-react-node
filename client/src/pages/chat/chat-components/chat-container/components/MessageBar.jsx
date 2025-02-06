import { useSocket } from "@/context/socketContext";
import { useAppStore } from "@/store/store";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import {GrAttachment} from "react-icons/gr"
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

export default function MessageBar() {
    const socket = useSocket()
    const emojiRef = useRef()
    const [message, setMessage] = useState("")
    const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)
    const {selectedChatType, selectedChatData, userInfo} = useAppStore()

    const handleAddEmoji =(emojiObject) =>{
        console.log(emojiObject)
        setMessage((msg)=> msg + emojiObject.emoji)
    }

    const handleSendMessage = async ()=>{
        if(!message || message === undefined){
            return
        }
        if(selectedChatType === "contact"){
            if(selectedChatType === "contact"){
                console.log("Message:", message);
                socket.emit("sendMessage",{
                    sender: userInfo.id,
                    content : message,
                    recipient : selectedChatData._id,
                    messageType : "text",
                    fileUrl : undefined
                })
            }
        }
    }

    useEffect(()=>{
        function handleCLickOutside (e){
            if(emojiRef.current && !emojiRef.current.contains(e.target)){
                setEmojiPickerOpen(false)
            }
        }
        document.addEventListener("mousedown", handleCLickOutside)
        return () =>{
            document.removeEventListener("mousedown", handleCLickOutside)
        }
    },[emojiRef])

  return <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
    <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input type="text" className="flex-1 p-5 bg-transparent rounded-md focus:border-none focus:outline-none" placeholder="Enter Message" value={message} onChange={(e) => setMessage(e.target.value)}/>

        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all " >
            <GrAttachment className="text-2xl" />
        </button>

        <div className="relative">
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all "  
        onClick={()=>setEmojiPickerOpen(!emojiPickerOpen)}>
            <RiEmojiStickerLine className="text-2xl" />
        </button>

        {emojiPickerOpen &&
        (<div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker theme="dark" open={emojiPickerOpen} onEmojiClick={handleAddEmoji} autoFocusSearch={false}></EmojiPicker>
        </div>)}
        </div>
    </div>
    <button className="bg-[#8417ff] rounded-md flex items-center justify-center p-5 focus:border-none hover:bg-[#741bda] focus:bg-[#741bda] focus:outline-none focus:text-white duration-300 transition-all" 
    onClick={handleSendMessage}>
            <IoSend className="text-2xl" />
        </button>
  </div>;
}
