import otpModel from "../models/OtpSchema.js";

const deleteOtp = async(phone)=>{
    try
    {
      await otpModel.findOneAndDelete({phone})
    }
    catch (error)
    {
      console.error('Error in deleting OTP: ', error);
    }
};

export default deleteOtp;