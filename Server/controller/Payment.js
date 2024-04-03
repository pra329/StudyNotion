const {instance} = require('../config/razorpay');
const COURSE = require('../models/Course');
const USER = require('../models/User');
const mailSender = require('../utils/mailSender');
const {courseEnrollmentEmail} = require('../mail/courseEnrollmentEmail');
const { default: orders } = require('razorpay/dist/types/orders');
const {default:mongoose} = require("mongoose");

// creation of payment and initiate the razorpay order
exports.capturePayment = async(req,res) => {
    // get courseId and UserId
    const{courseId} = req.body;
    const{userId} = req.user.id;
    // validation
    // valid courseId
    if(!courseId){
        return res.json({
            success:false,
            message:'Please Provide the course Id'
        })
    }
    // valid courseDetails
    let course;
    try{
        course = await COURSE.findById(courseId);
        if(!course){
            return res.json({
                success:false,
                message:'Could Not Find The Course'
            })
        }
        // user alredy pay for same course
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentEnrolled.includes(uid)){
            return res.json({
                success:false,
                message:'Student Is Alredy Enrolled In This Course'
            })
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
    // order create 
    const amount = course.price;
    const currency = "INR";
    const options = {
        amount : amount * 100,
        currency,
        receipt:Math.random(Date.now()).toString(),
        notes:{
            courseId:courseId,
            userId,
        }
    }
    try{
        // initiate the payment using razorpay
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse); 
        // return response
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription:course.courseDescription,
            thumbnail:course.thumbnail,
            orderId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount
        });
    }
    catch(error){
        return res.json({
            success:false,
            message:'Could Not Initiate The Order'
        })
    }
}

// verify the signature of razorpay and server
exports.verifySignature = async(req,res) => {
    const webhookSecret = "12345678"
    const signature = req.headers["x-razorpay-signature"];
    const shasum = crypto.createHmac("sha256",webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");
    if(signature === digest){
        console.log("Payment Is Authorized");
        const{courseId , userId} = req.body.payload.payment.entity.notes;
        try{
            // find the course and enroll the student in it
            const enrolledCourse = await COURSE.findByIdAndUpdate(
                {_id:courseId},
                {$push:{studentEnrolled:userId}},
                {new:true}
            );
            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:'Course Not Found'
                })
            }
            console.log(enrolledCourse);
            // find the student and add the course to their list of enrolled course
            const enrolledStudent = await USER.findOneAndUpdate(
                {_id:userId},
                {$push:{courses:courseId}},
                {new:true}
            );
            console.log(enrolledStudent);
            // mail send 
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Congratulation",
                "Congratulation, You Are Onboarded into New Course"
            );
            console.log(emailResponse);
            res.json({
                success:true,
                message:'Signature Verfied and Course Added'
            })
        }
        catch(error){
            return res.status(500).json({
                success:false,
                message:'Signature Not Verfied and Course Not Added'
            });
        }
    }
    else{
        return res.status(400).json({
            success:false,
            message:'Invalid Request'
        })
    }
}