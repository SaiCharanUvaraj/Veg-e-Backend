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
        console.error('Error in verifying forgot OTP: ', error);
        return { success: false, message: 'Internal server error' };
    }

}
export default verifyForgotOtp;