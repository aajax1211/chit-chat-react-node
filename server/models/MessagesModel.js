import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true 
    },
    recipient : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : false 
    },
    messageType:{
        type : String,
        enum : ["text","file"],
        required : true 
    },
    content :{
        type : String,
        
        validate: {
            validator: function (value) {
                return this.messageType !== "text" || (value && value.trim().length > 0);
            },
            message: "Content is required when messageType is 'text'."
        },
        
    },
    fileUrl: {
        type: String,
    
        validate: {
            validator: function (value) {
                return this.messageType !== "file" || (value && value.trim().length > 0);
            },
            message: "File URL is required when messageType is 'file'."
        }
    },
    timeStamp:{
        type : Date,
        default : Date.now
    }

})

const Messages = mongoose.model("Messages", messageSchema)

export default Messages