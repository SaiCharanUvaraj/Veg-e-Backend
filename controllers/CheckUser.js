import userRegModel from "../models/UserRegSchema.js";
const checkUser=async(phone)=>{
    try
    {
        const record=await userRegModel.findOne({phone});
        if (!record)
            return false;
        else
            return true;
    } 
    catch (error) 
    {
        console.error('Error in checking for phone number existence: ', error);
    }
}
export default checkUser;