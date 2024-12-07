import mongoose from "mongoose";
const otpSchema=new mongoose.Schema({
    phone:{
      type: String,
      required: true,
      unique: true
    },
    otp:{
      type: String,
      required: true
    }
  })
const otpModel=mongoose.model("Otp",otpSchema);
export default otpModel;