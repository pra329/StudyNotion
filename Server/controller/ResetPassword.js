const USER = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
// reset password token
exports.resetPasswordToken = async(req,res) => {
    try{
        // get email from req.body
        const email = req.body.email;
        // check user for the email , email validation
        const user = await USER.findOne({email:email});
        if(!user){
            return res.status(401).json({
                success:false,
                message:'Your Email Id Is Not Registered'
            })
        }
        // generate token
        // we are generating the token because we have to fetch the user later on when reseting the password 
        // and this is the only way avaialaible to fetch the user later on 
        // we have added the entry of the token in the model of the user
        const token = crypto.randomUUID();
        // update user by adding token and expiration time
        const updatedDetails = await USER.findOneAndUpdate({email:email} , {
            token:token,
            resetPasswordExpires: Date.now() + 3600000
        },{new:true})
        // create url
        const url = `http://localhost:3000/update-password/${token}`;
        // send mail containing the url
        await mailSender(email , "Password Reset Link" , `Password Reset Link: ${url}`)
        // return response
        return res.json({
            success:true,
            message:'Email Sent Successfully,please check email and change password'
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error In Reseting The Password'
        })
    }
}

// reset password
exports.resetPassword = async(req,res) => {
    try{
        // data fetch
        const {password , confirmPassword , token} = req.body;
        // validation
        if(password != confirmPassword){
            return res.json({
                success:false,
                message:'Password Not Matching'
            })
        }
        // get userdetails from db using the token
        const userDetails = await USER.findOne({token:token});
        // if no entry -> invalid token
        if(!userDetails){
            return res.json({
                success:false,
                message:'Token Is Invalid'
            })
        }
        // token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.json({
                success:false,
                message:'Token Is Expired, Please Regenerate The Token Again'
            })
        }
        // hash pwd
        const hashedPassword = await bcrypt.hash(password , 10);
        // password update 
        await USER.findOneAndUpdate(
            {token:token},
            {password:hashedPassword},
            {new:true}
        );
        // return response
        return res.status(200).json({
            success:true,
            message:'Password Reset Successfull'
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error In Reseting The Password'
        })
    }
}