import Messages from "../models/MessagesModel.js"
import {mkdirSync, renameSync} from "fs"

export const getMessages = async(request, response, next) => {
    try {
        const user1 = request.userId
        const user2 = request.body.id

        if(!user1 || !user2){
            return response.status(400).send("Both user ID's are Required")
        }

        const message = await Messages.find({
            $or: [
                {sender : user1, recipient: user2},{sender: user2, recipient: user1}
            ]
        }).sort({timeStamp : 1})
        return response.status(200).json({messages:message})

        
    } catch (error) {
        console.log(error)
        return response
            .status(500)
            .send("Internal Server Error")
    }
}


export const uploadFile = async(request, response, next) => {
    try {
        if(!request.file){
            response.status(400).send("file is required")
        }
        const date = Date.now()
        let fileDir = `uploads/files/${date}`
        let filename = `${fileDir}/${request.file.originalname}`

        mkdirSync(fileDir,{recursive : true })

        renameSync(request.file.path,filename)
        return response.status(200).json({filePath : filename})

        
    } catch (error) {
        console.log(error)
        return response
            .status(500)
            .send("Internal Server Error")
    }
}