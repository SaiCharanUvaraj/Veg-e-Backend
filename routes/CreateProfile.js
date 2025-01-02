import express from "express";
import userInfoModel from "../models/UserInfoSchema.js";
const createProfile=express.Router();

createProfile.post('/create-profile', async(req,res) =>{
    const {phone,name,dob,address}=req.body;
    try 
    {
        await userInfoModel.create({
            phone,
            name,
            dob,
            address
        });
        res.status(200).json({success:true});
    } 
    catch (error) 
    {
        console.error("Error in creating profile: ", error);
        res.status(200).json({success:false});
    }
});
export default createProfile;