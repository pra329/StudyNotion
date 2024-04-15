const USER = require('../models/User');
const OTP = require('../models/OTP');
const otpgenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const PROFILE = require('../models/Profile');
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
require('dotenv').config();
// send otp
exports.sendOTP = async(req,res) => {
    try{
        // fetch the email from the req body
        const {email} = req.body;
        // check for email
        if(!email){
            return res.status(401).json({
                success:false,
                message:'Enter The Email'
            });
        }
        // check if the user alredy exist or not 
        const checkUserPresent = await USER.findOne({email});
        // if the user alredy present then return response
        if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:'User Alredy Registered'
            })
        }
        // generate otp
        var otp = otpgenerator.generate(6 , {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        });
        console.log(otp);
        // check unique otp or not
        const result = await OTP.findOne({otp});
        while(result){
            otp = otpgenerator.generate(6 , {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result = await OTP.findOne({otp:otp});
        }
        const otpPayload = {email , otp};
        // create an entry fot otp in db
        const otpBody = await OTP.create(otpPayload);
        return res.status(200).json({
            success:true,
            message:'OTP Sent Successfully',
            otp,
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message 
        })
    }
}

// signup
exports.signUp = async(req,res) => {
    try{
        // data fetch
        const{firstName,lastName,email,password,confirmPassword,accountType,otp} = req.body;
        // data validate
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:'All Field Are Required'
            });
        }
        // 2 password match(create apssword and confirm password)
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:'Password And Confirm Password Value Does Not Match'
            })
        }
        // check user alredy exist or not
        const existingUser = await USER.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:'User Is Alredy Registered'
            });
        }
        console.log("We Are In Signup Folder");
        // find most recent otp for the user
        // * created at -1 will sort the otp in descending order and limit 1 will provide the first otp
        const recentOTP = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        console.log(recentOTP);
        // validate otp
        if(recentOTP.length === 0){
            // OTP Not Found
            return res.status(400).json({
                success:false,
                message:'OTP Not Found'
            });
        }
        else if(otp !== recentOTP[0].otp){
            return res.status(400).json({
                success:false,
                message:'OTP Not Matched'
            })
        }
        // password hash
        const hashedPassword = await bcrypt.hash(password,10);
        // creating profile
        const profileDetails = await PROFILE.create({
            dateOfBirth:null,
            about:null,
            contactNo:null
        })
        // entry create db response return
        const user = await USER.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        })
        return res.status(200).json({
            success:true,
            message:'Sign Up Succesfully',
            user
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Sign Up Failed'
        })
    }
}

// login
exports.login = async(req,res) => {
    try{
        // get data from req body
        const {email , password} = req.body;
        // validation data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:'All Fields Are Required'
            })
        }
        // user exist or not
        const user = await USER.findOne({email}).populate("additionalDetails").lean();
        if(!user){
            return res.status(401).json({
                success:false,
                message:'User Not Exist Please Sign Up First'
            })
        }
        // generate jwt after password matching
        // comparing  the password using the compare method
        if(await bcrypt.compare(password , user.password)){
            const payload = {
                email:user.email,
                id:user._id,
                accountType:user.accountType
            }
            // creating a token using the jwt sign method
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h"
            })
            user.token = token;
            user.password = undefined;
            const options = {
                // Timing Of Expiring The Cookie Is 3 Days
                expires:new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly:true,
            }
            // create cookie and send response
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged In Succesfully'
            }) 
        }
        else{
            return res.status(401).json({
                success:false,
                message:'Password Do Not Match'
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error In Logging in'
        })
    }
}


// change password
exports.changePassword = async(req,res) => {
    try{
        const userDetails = await USER.findById(req.user.id);
        console.log(userDetails);
        const{oldPassword , newPassword , confirmPassword} = req.body;
        // Validation of input fields
        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(401).json({
                success:false,
                message:'Fill The Details Carefully'
            })
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword , userDetails.password);
        if(!isPasswordMatch){
            // if old password doe not match
            return res.status(401).json({
                success:false,
                message:'Old Password Does Not Match'
            })
        }
        if(newPassword !== confirmPassword){
            return res.status(403).json({
                success:false,
                message:'New Password And Confirm Password Do Not Match'
            })
        }
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        // update in The Database
        const updatedUserDetails = await USER.findByIdAndUpdate(
			req.user.id,
			{password: encryptedPassword},
			{new: true}
		);
        try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
                `Password Updated`,
				`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
			);
		} 
        catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}
        return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
    }
    catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
}