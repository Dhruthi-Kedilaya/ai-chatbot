import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    sender: {
    type: String, // "user" or "gemini"
    enum: ["user", "gemini"],
    required: true
  },
    text:{
        type:String,
        required:true
    }
},{timestamps:true});

const message=mongoose.model('Message',messageSchema);
export default message;