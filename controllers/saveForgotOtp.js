import userRegModel from "../models/UserRegSchema.js";

const saveForgotOtp = async(phone,forgotOtp)=>{
    try
    {
      await userRegModel.findOneAndUpdate(
        {phone},
        {forgotOtp},
        {new:true,upsert: true}
      )
    }
    catch (error)
    {
      console.error('Error in saving forgot OTP: ', error);
    }
};

export default saveForgotOtp;