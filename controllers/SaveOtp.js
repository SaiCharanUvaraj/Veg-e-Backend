import otpModel from "../models/OtpSchema.js";

const saveOtp = async(phone,otp)=>{
    try
    {
      await otpModel.findOneAndUpdate(
        {phone},
        {otp},
        {new:true,upsert: true}
      )
    }
    catch (error)
    {
      console.error('Error in saving OTP: ', error);
    }
};

export default saveOtp;