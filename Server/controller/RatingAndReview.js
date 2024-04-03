const RATINGANDREVIEW = require('../models/RatingAndReview');
const COURSE = require('../models/Course');
const { default: mongoose } = require('mongoose');

exports.createRating = async(req,res) => {
    try{
        // get user id
        const userId = req.user.id;
        // fetch data from req.body
        const {rating,review,courseId} = req.body;
        // check if user is enrolled in the course or not
        const courseDetails = await COURSE.findOne({_id:courseId,
                                                    studentEnrolled:{$elemMatch:{$eq:userId}},
        })
        // check user has not submitted the review alredy
        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student Is Not Enrolled In This Course",
            })
        }
        const alredyReviewed = await RATINGANDREVIEW.findOne({
            user:userId,
            course:courseId
        })
        if(alredyReviewed){
            return res.status(403).json({
                success:false,
                message:'User Has Alredy Reviewed The Course'
            })
        }
        // create rating and review
        const ratingReview = await  RATINGANDREVIEW.create({rating,review,course:courseId,user:userId});
        // update the course with the rating and review
        const updatedCourseDetails = await COURSE.findByIdAndUpdate({_id:courseId},
                                      {
                                        $push:{
                                            ratingAndReviews:ratingReview._id
                                        }
                                      },
                                      {new:true}
        )
        console.log(updatedCourseDetails);
        // return response
        return res.status(200).json({
            success:true,
            message:'Rating And Review Created Successfully'
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error Occured While Submitting The Review And Rating',
            ratingReview,
        })
    }
}

exports.getAverageRating = async(req,res) => {
    try{
        // get course id
        const courseId = req.body.courseId;
        // calculate average rating
        const result = await RATINGANDREVIEW.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"},
                },
            },

        ])
        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
            })
        }
        // if no rating review exist
        return res.status(200).json({
            success:true,
            message:'Average Rating Is Zero No Rating To The Course Given Till Now',
            averageRating:0
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error in Get Average Rating'
        })
    }
}

exports.getAllRating = async(req,res) => {
    try{
        const allReview = await RATINGANDREVIEW.find({}).sort({rating:"desc"}).populate({
            path:"user",
            select:"firstName lastName email iamge"
        }).populate({
            path:"course",
            select:"courseName",
        }).exec()
        return res.status(200).json({
            success:true,
            message:'All Reviews Fetced Successfully',
            data:allReview 
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error In Fetching The Rating And Review'
        })
    }
}