// importing modules
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

// importing some basic controller functions
import sendOTP from './controllers/SendOtp.js'
import saveOtp from './controllers/SaveOtp.js';
import verifyOtp from './controllers/VerifyOtp.js';
import registerUser from './controllers/RegisterUser.js';
import checkUser from './controllers/CheckUser.js';
import deleteOtp from './controllers/DeleteOtp.js';
import authUser from './controllers/AuthUser.js';
import verifyForgotOtp from './controllers/VerifyForgotOtp.js';
import saveForgotOtp from './controllers/saveForgotOtp.js';

// importing admin related controller functions
import updateItem from './controllers/UpdateItem.js';
import deleteItem from './controllers/DeleteItem.js';

// importing route functions
import createProfile from './routes/CreateProfile.js';
import fetchInfo from './routes/FetchInfo.js';
import fetchItemsInfo from './routes/FetchItemsInfo.js';
import addToCart from './routes/AddToCart.js';
import removeFromCart from './routes/RemoveFromCart.js';
import placeOrder from './routes/PlaceOrder.js';

// extracting env variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI=process.env.MONGO_URI;
const SECRET_KEY=process.env.JWT_KEY;

// CORS Policy updations
const corsOptions = {
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5174',
            'http://localhost:5173',
            'https://veg-e.netlify.app',
            'https://veg-e-admin.netlify.app',];
    
        if (!origin || allowedOrigins.includes(origin))
            callback(null, true);
        else
            callback(new Error('Not allowed by CORS'));
        },
    credentials: true,  
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// using middlewares
app.use(express.json());
app.use(cookieParser());

// Routes
app.use(createProfile);
app.use(fetchInfo);
app.use(fetchItemsInfo);
app.use(addToCart);
app.use(removeFromCart);
app.use(placeOrder);

const connectDB = async () => {
    try 
    {
      await mongoose.connect(MONGO_URI);
    } 
    catch (err) 
    {
      console.error('MongoDB connection error:', err);
    }
};
connectDB();

app.get('/', (req, res) => {
    res.send("Server is running");
});

app.post('/send-otp', async(req, res) => {
    const {number}=req.body;
    const response=await checkUser(number);
    if(response===true)
    {
        res.send(false).status(200);
        return;
    }
    const otp = Math.floor(Math.random() * (10000 - 1000)) + 1000;
    //sendOTP(number,otp);
    saveOtp(number,otp);
    res.send("OTP was sent to your number").status(200);
});

app.post('/forgot-password', async(req, res) => {
    const {number}=req.body;
    const response=await checkUser(number);
    if(response===false)
    {
        res.send(false).status(200);
        return;
    }
    const otp = Math.floor(Math.random() * (10000 - 1000)) + 1000;
    //sendOTP(number,otp);
    saveForgotOtp(number,otp);
    res.send("OTP was sent to your number").status(200);
});

app.post('/verify-forgot-otp', async(req, res) => {
    const {number,otp}=req.body;
    const response=await verifyForgotOtp(number,otp);
    res.status(200).json(response);
});

app.post('/verify-otp', async(req, res) => {
    const {number,otp}=req.body;
    const response=await verifyOtp(number,otp);
    deleteOtp(number);
    res.status(200).json(response);
});

app.post('/register-user',async(req,res) =>{
    const {phone,pwd}=req.body;
    const response=await registerUser(phone,pwd);
    res.status(200).json(response);
});

app.post('/auth-user', async (req, res) => {
    const { phone, pwd } = req.body;
    const response = await authUser(phone, pwd);
    if(response.success) 
    {
        const token = jwt.sign({ phone }, SECRET_KEY, { expiresIn: '1hr' });
        res.cookie('VegeAuthToken', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600000,
        });
    }
    res.status(200).json(response);
});

app.post('/logout', async (req, res) => {
    res.clearCookie('VegeAuthToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
    });
    res.status(200).json({success: true});      
});


app.post('/update-items',async(req,res) =>{
    const {item,type,price,quantity,url}=req.body;
    await updateItem(item,type,price,quantity,url);
    res.status(200).send("Item updated...");
});

app.post('/delete-items',async(req,res) =>{
    const {item}=req.body;
    await deleteItem(item);
    res.status(200).send("Item deleted...");
});

//Rest of the routes in Routes folder

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});