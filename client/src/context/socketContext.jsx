/* eslint-disable react/prop-types */
import { useAppStore } from "@/store/store";
import { HOST } from "@/utils/constants";
import  { createContext,useContext,useRef, useEffect } from "react";
import { io } from "socket.io-client";

const SocketContext  = createContext(null)


export const useSocket = () =>{
    return useContext(SocketContext)
}


export const SocketProvider = ({children}) =>{
    const socket = useRef(null)
    const {userInfo} = useAppStore()

    useEffect(()=>{
        console.log("Checking socket.current:", socket.current);
        if(userInfo){
            console.log("User Info: ", userInfo);
            socket.current = io(HOST,{
                withCredentials : true,
                query : {userId : userInfo.id}
            })

            socket.current.on("connect",()=>{
                console.log("Connected to socket server")
            })

            console.log("Setting up receiveMessage listener...");

            const handleReceivedMessage = (message) =>{
                console.log("Received message on frontend:", message);
                const {selectedChatData, selectedChatType, addMessage} = useAppStore.getState()

                if(selectedChatType !== undefined && selectedChatData._id ===  message.sender._id || selectedChatData._id === message.recipient._id){
                    console.log("message received :",message)
                    addMessage(message)
                }
            }

            socket.current.on("receiveMessage", handleReceivedMessage)
            return ()=>{
                console.log("Removing receiveMessage listener...");
                socket.current.disconnect()
                socket.current.off("receiveMessage", handleReceivedMessage);
            }
        }
    },[userInfo])

    return <SocketContext.Provider value={socket.current}>
        {children}
    </SocketContext.Provider>
}
