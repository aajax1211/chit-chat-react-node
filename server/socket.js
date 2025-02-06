import {Server} from "socket.io"
import Messages from "./models/MessagesModel.js"

export const setupSocket = (server) =>{
    const io = new Server(server,{
        cors:{
            origin : process.env.ORIGIN,
            methods : ["GET", "POST"],
            credentials : true,
        }
        
    })   

    const userSocketMap = new Map()

    const disconnect = (socket) =>{
        console.log(`Client disconnected : ${socket.id}`)
        for(const [userId , socketId] of userSocketMap.entries()){
            if(socketId === socket.id){
                userSocketMap.delete(userId)
                break
            }
        }
    }

    const sendMessage = async (message) => {
        const createdMessage = await  Messages.create(message)
        const senderSocketId = userSocketMap.get(message.sender)
        const recipientSocketId = userSocketMap.get(message.recipient)


        

        const messageData = await Messages.findById(createdMessage._id).populate("sender","id email firstName lastName image color").populate("recipient","id email firstName lastName image color")

        if(recipientSocketId){
            io.to(recipientSocketId).emit("recieveMessage",messageData)
        }
        if(senderSocketId){
            io.to(senderSocketId).emit("recieveMessage",messageData)
        }
    }

    io.on("connection", (socket)=>{
        const userId = socket.handshake.query.userId

        if (!userId) {
            console.log("User ID not provided during connection");
            socket.disconnect(true);
            return;
        }

        if(userId){
            userSocketMap.set(userId,socket.id)
            console.log(`User connected :${userId} with Socket ID : ${socket.id}` )
        }else{
            console.log("User ID not provided during connection")
        }

        socket.on("sendMessage", (message) => sendMessage(message) )
        socket.on("disconnect", () => disconnect(socket))
    })
}


