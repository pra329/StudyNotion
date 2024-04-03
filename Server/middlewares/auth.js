const jwt = require('jsonwebtoken');
const USER = require('../models/User');
require('dotenv').config();
// auth
exports.auth = async(req,res,next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ","");
        // if token is not present
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token Missing'
            })
        }
        console.log(token);
        // verify the token
        try{
            const payload = jwt.verify(token , process.env.JWT_SECRET);
            console.log(payload);
            req.user = payload;
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:'Token Is Invalid'
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:'Something Went Wrong While Verifying The Token'
        })
    }
}
// student
exports.isStudent = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success:false,
                message:'This Is The Protected Route For The Student'
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role Is Not Matching'
        })    
    }
}
// instructor
exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:'This Is A Protected Route For The Instructor'
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role Is Not Matching'
        })
    }
}
// admin
exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success:false,
                message:'This Is A Protected Route For The Admin'
            })
        }
        next();
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'User Role Is Not Matching'
        })
    }
}