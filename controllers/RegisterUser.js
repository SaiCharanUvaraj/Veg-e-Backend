import userRegModel from "../models/UserRegSchema.js";

const registerUser = async(phone,password) =>{
    try 
    {
        await userRegModel.create({
          phone,
          password
        });
        return {success:true};
    } 
    catch (error) 
    {
        console.error("Error in registering user: ", error);
        return {success:false};
    }
}
export default registerUser;