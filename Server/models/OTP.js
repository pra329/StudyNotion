const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require('../mail/emailVerificationTemplate');

const otpSchema = new mongoose.Schema({
    // email on which the otp will be transferred
    email:{
        type:String,
        required:true,
    },
    // One Time Password
    otp:{
        type:String,
        required:true,
    },
    // Created At Will Store Current Time In MilliSecond
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5 * 60,
    }
})

async function sendVerificationEmail(email, otp) {
	try {
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
        console.log("Email Sent Successfully -> ", mailResponse);
	} 
    catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

otpSchema.pre("save",async function(next){
    await sendVerificationEmail(this.email , this.otp);
    next();
})

module.exports = mongoose.model("OTP" , otpSchema);