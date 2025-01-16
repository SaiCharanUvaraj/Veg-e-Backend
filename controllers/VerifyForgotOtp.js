import userRegModel from "../models/UserRegSchema.js";
const verifyForgotOtp = async(phone,otp) =>{
    try
    {
        const record=await userRegModel.findOne({phone});
        if (!record)
            return { success: false, message: 'OTP not found or expired' };
        if (record.forgotOtp === otp)
            return { success: true, message: 'OTP verified successfully!' };
        else
            return { success: false, message: 'Invalid OTP' };
    } 
    catch (error) 
    {
        return { success: false, message: 'Error in verifying forgot OTP. Please try again !' };
    }

}
export default verifyForgotOtp;