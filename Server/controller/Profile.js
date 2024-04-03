const PROFILE = require('../models/Profile');
const USER = require('../models/User');
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require('dotenv').config();
// update profile
exports.updateProfile = async(req,res) => {
    try{
        // get data
        const { dateOfBirth = "", about = "", contactNumber } = req.body;
        // get user id
        const id = req.user.id;
        // validation
        if(!contactNumber){
            return res.status(400).json({
                success:false,
                message:'All Fields Are Required'
            })
        }
        // find profile
        const user = await USER.findById(id);
        const ProfileId = user.additionalDetails;
        const profileDetails = await PROFILE.findById(ProfileId);
        // update the profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNo = contactNumber;
        await profileDetails.save();
        // return response
        return res.status(200).json({
            success:true,
            message:'Profile Updated Successfully',
            profileDetails
        })
    }   
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error in updating The Profile'
        })
    }
}

// delete account
exports.deleteAccount = async(req,res) => {
    try{
        // get id
        const id = req.user.id;
        // validation
        const userDetails = await USER.findById(id);
        if(!userDetails){
            return res.status(404).json({
                success:false,
                message:'User Not Found'
            })
        }
        // delete profile
        await PROFILE.findByIdAndDelete({_id:userDetails.additionalDetails})
        // delete user
        await USER.findByIdAndDelete({_id:id});
        // return response
        return res.status(200).json({
            success:true,
            message:'Account Deleted Successfully'
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error In Deleting The Account'
        })
    }
}
// get all details
exports.getAllUserDetails = async(req,res) => {
    try{
        // get id
        const id = req.user.id;
        // fetch the user details
        const userDetails = await USER.findById(id).populate("additionalDetails").exec();
        // return resposne
        return res.status(200).json({
            success:true,
            message:'Details Fetched Successfully',
            userDetails
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:'Error In Fetching The Details'
        })
    }
}
exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await USER.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } 
    catch (error) {
        console.log(error);
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};
  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await USER.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};