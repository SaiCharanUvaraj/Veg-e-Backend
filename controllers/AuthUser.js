import userRegModel from "../models/UserRegSchema.js";

const authUser = async (phone, pwd) => {
    try 
    {  
        const record = await userRegModel.findOne({ phone });
        if (!record)
            return { success: false, message: 'The phone number is not registered.' };
        if (record.password === pwd)
            return { success: true, message: 'Signing in to your account...' };
        else
            return { success: false, message: 'The password is incorrect.' };
    } 
    catch (error) 
    {
        return { success: false, message: 'Error in signing into account. Please try again !' };
    }
};

export default authUser;
