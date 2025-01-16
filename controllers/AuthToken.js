import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const SECRET_KEY=process.env.JWT_KEY;

const authToken = (req, res, next) => {
    const token = req.cookies.VegeAuthToken; 
    if (!token)
        return res.status(200).json({success:false});
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err)
            return res.status(200).json({success:false});
        req.user = user;  
        next();
    });
};
export default authToken;