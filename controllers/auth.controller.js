require("dotenv").config()
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const maxAge = 1; // hour
const createToken = (user_id)=>{
    return jwt.sign({user_id},process.env.JWT_SECRET,{ expiresIn: maxAge })
} 

const signUp = async (req,res) => {
    try{
        const { email, password, username } = req.body;
        console.log("Sign up....");
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const user = await User.create({username,email,password})
       return  res.status(201).send({
            status: 201,
            "success": true,
            "message": "User registered successfully"
            
        });
    }catch(error){
       return res.status(500).json(error);
    }
}

const signIn = async (req,res)=>{
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user)
            return res.status(400).send({
                status: 400,
                msg: "invalid email or password",
            });
        
        const auth = await bcrypt.compare(password,user.password)
        if(auth){
            const token = createToken(user._id);
            res.cookie("token", token, { httpOnly: true, maxAge: maxAge});
            return res.status(200).send({
                status: 200,
                "success": true,
                "user": user,
            });
        }
        return res.status(400).send({
            status: 400,
            msg: "Incorrect password",
          });
    }catch(error){
        res.status(500).send(error);
    }
}

const signOut = async (req, res) => {
    
    res.cookie("token", "", { maxAge: maxAge });
    res.status(200).send({
        status: 200,
        "success": true,
        "message": "User signed out successfully"
    });
};

module.exports = { signUp, signIn, signOut };
