import Messages from "../models/MessagesModel.js"
import { User } from "../models/UserModel.js"

export const getMessages = async(request, response, next) => {
    try {
        const user1 = request.userId
        const user2 = req.body.id

        if(!user1 || !user2){
            return response.status(400).status("Both user ID's are Required")
        }

        const message = await Messages.find({
            $or: [
                {sender : user1, recipient: user2},{sender: user2, recipient: user1}
            ]
        }).sort({Timestamp : 1})
        const contacts = await User.find({
            $and : [
                {_id: {$ne : request.userId}},
                {
                    $or : [{firstName: regex}, {lastName : regex}, {email : regex}]
                },
            ],
        })

        
    } catch (error) {
        console.log(error)
        return response
            .status(500)
            .send("Internal Server Error")
    }
}