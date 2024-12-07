import userRegModel from "../models/UserRegSchema.js";

const registerUser = async(phone,password) =>{
    try 
    {
        await userRegModel.create({
          phone,
          password
        });
        return {success:true, message:"Signed up successfully !"};
    } 
    catch (error) 
    {
        console.error("Error in registering user: ", error);
        return {success:false, message:"Internal Server error"};
    }
}
export default registerUser;