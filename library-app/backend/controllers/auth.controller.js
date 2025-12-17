const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

exports.signup = async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message: "Email and password are required"});
    }

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(409).json({message:"User Already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        const newUser = new User({email,password:hashedPassword})
        await newUser.save();

        res.status(201).json({message:'User registered successfully'});

    }catch(error){
        console.error('Signup Error:',error);
        res.status(500).json({message:"Server Error during Signup"});
    }
}

exports.login = async (req,res)=>{
    const{email,password} = req.body;
    if(!email || !password){
        return res.status(400).json({message: "Email and password are required"});
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid Email"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid Credentials"});
        }
        const payload = {
            id: user._id,
            email: user.email
        };

        const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'1h'});

        res.status(200).json({message:"Login Sucessfull",token:token,userId: user._id});

    }catch(error){
        console.error('Login Error',error);
        res.status(500).json({message:'Server error during login'});
    }
}