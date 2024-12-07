import mongoose from "mongoose";
const userRegSchema=new mongoose.Schema({
    phone:{
        type: String,
        required: true,
        unique: true
      },
    password:{
        type: String,
        required: true
    },
    forgotOtp: {type:String,
        default:""
    },
    createdAt: { type: Date, default: Date.now }
})
const userRegModel=mongoose.model("User Credential",userRegSchema);
export default userRegModel;