import express from "express";
import userInfoModel from "../models/UserInfoSchema.js";
import authToken from "../controllers/AuthToken.js";

const fetchInfo = express.Router();

fetchInfo.get('/fetch-info', authToken, async (req, res) => {
    try 
    {
        const { phone } = req.user;
        const userInfo = await userInfoModel.findOne({ phone });
        if (!userInfo)
            return res.status(200).json({ success:false});
        res.status(200).json({success: true,data: userInfo});
    } 
    catch (error) 
    {
        console.error("Error in fetching user info:", error.message);
        res.status(200).json({success:false});
    }
});

export default fetchInfo;
