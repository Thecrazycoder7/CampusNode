const UserModel = require("../Models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const {name, college, year, email, password} = req.body;
        const user = await UserModel.findOne({email});

        if(user){
            return res.status(409)
            .json({message: "User is already exit, you can login", success: false});
        }
        const userModel = new UserModel({name, college, year, email, password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        res.status(201).json({
          message: "Signup successfully",
          success: true
        });
    } catch (error) {
        res.status(500).json({
          message: "Internal server error",
          success: false
        })
    }
}

const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        const errorMsg = "User not found or password is incorrect";
        if(!user){
            return res.status(403)
            .json({message: errorMsg, success: false});
        }
        
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if(!isPasswordMatch){
            return res.status(403)
            .json({message: errorMsg, success: false});
        }

        const token = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );
        res.status(200).json({
           message: "Login successfully",
           success: true,
           token,
           email,
           name: user.name
        });
    } catch (error) {
        res.status(500).json({
          message: "Internal server error",
          success: false
        })
    }
}

module.exports = {
    signup, login
}