const COURSE = require('../models/Course');
const CATEGORY = require('../models/Category');
const USER = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');

// create course handler function
exports.createCourse = async (req, res) => {
	try {
		// Get user ID from request object
		const userId = req.user.id;

		// Get all required fields from request body
		let {courseName,courseDescription,whatYouWillLearn,price,tag,category,status,instructions} = req.body;

		// Get thumbnail image from request files
		const thumbnail = req.files.thumbnailImage;

		// Check if any of the required fields are missing
		if (
			!courseName ||
			!courseDescription ||
			!whatYouWillLearn ||
			!price ||
			!tag ||
			!thumbnail ||
			!category
		) {
			return res.status(400).json({
				success: false,
				message: "All Fields are Mandatory",
			});
		}
		if (!status || status === undefined) {
			status = "Draft";
		}
		// Check if the user is an instructor
		const instructorDetails = await USER.findById(userId, {
			accountType: "Instructor",
		});

		if (!instructorDetails) {
			return res.status(404).json({
				success: false,
				message: "Instructor Details Not Found",
			});
		}

		// Check if the category given is valid
		const categoryDetails = await CATEGORY.findById(category);
		if (!categoryDetails) {
			return res.status(404).json({
				success: false,
				message: "Category Details Not Found",
			});
		}
		// Upload the Thumbnail to Cloudinary
		const thumbnailImage = await uploadImageToCloudinary(
			thumbnail,
			process.env.FOLDER_NAME
		);
		console.log(thumbnailImage);
		// Create a new course with the given details
		const newCourse = await COURSE.create({
			courseName,
			courseDescription,
			instructor: instructorDetails._id,
			whatYouWillLearn: whatYouWillLearn,
			price,
			tag: tag,
			category: categoryDetails._id,
			thumbnail: thumbnailImage.secure_url,
			status: status,
			instructions: instructions,
		});

		// Add the new course to the User Schema of the Instructor
		await USER.findByIdAndUpdate(
			{
				_id: instructorDetails._id,
			},
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
		// Add the new course to the Categories
		await CATEGORY.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					course: newCourse._id,
				},
			},
			{ new: true }
		);
		// Return the new course and a success message
		res.status(200).json({
			success: true,
			data: newCourse,
			message: "Course Created Successfully",
		});
	} catch (error) {
		// Handle any errors that occur during the creation of the course
		console.error(error);
		res.status(500).json({
			success: false,
			message: "Failed to create course",
			error: error.message,
		});
	}
};

// get all courses handler function
exports.getAllCourses = async(req,res) => {
    try{
        const allCourses = await COURSE.find({},{courseName:true,price:true,thumbnail:true,instructo:true,ratingAndReviews:true,studentEnrolled:true}).populate("instructor").exec();
        return res.status(200).json({
            success:true,
            message:'Data For All Courses Fetched Successfully',
            data:allCourses
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error In Getting The Course'
        })
    }
}

// get course Details Handler function
exports.getCourseDetails = async(req,res) => {
    try{
        // get id
        const {courseId} = req.body;
        // find course Details
        const courseDetails = await COURSE.find({_id:courseId}).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            },
        })
        .populate("category")
        // .populate("ratingAndreview")
        .populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            },
        }).exec();
        // validation
        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:`Could Not Find The Course With ${courseId}`
            });
        }
        // return response
        return res.status(200).json({
            success:true,
            message:'Course Details Fetched Successfully',
            data:courseDetails
        })
    }
    catch(error){
		console.log(error.message);
        return res.status(500).json({
            success:false,
            message:'Error In Fetching The Course Details'
        })
    }
}