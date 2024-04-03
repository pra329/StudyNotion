const SUBSECTION = require('../models/Subsection');
const SECTION = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');
require('dotenv').config();
// create Subsection
exports.createSubsection = async(req,res) => {
    try{
        // fetch data from req body
        const{sectionId , title , timeDuration , description} = req.body
        // fetch video file
        const video = req.files.videoFile;
        // data validation
        // Check if all necessary fields are provided
        if (!sectionId || !title || !description || !video || !timeDuration) {
        return res
          .status(404)
          .json({ success: false, message: "All Fields are Required" })
        }
      console.log(video)
      // Upload the video file to Cloudinary
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      )
      console.log(uploadDetails)
      // Create a new sub-section with the necessary information
      const SubSectionDetails = await SUBSECTION.create({
        title: title,
        timeDuration: `${uploadDetails.timeDuration}`,
        description: description,
        videoUrl: uploadDetails.secure_url,
      })
  
      // Update the corresponding section with the newly created sub-section
      const updatedSection = await SECTION.findByIdAndUpdate(
        { _id: sectionId },
        { $push: { subSection: SubSectionDetails._id } },
        { new: true }
      ).populate("subSection")
  
      // Return the updated section in the response
      return res.status(200).json({ success: true, data: updatedSection })
    } catch (error) {
      // Handle any errors that may occur during the process
      console.error("Error creating new sub-section:", error)
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}
// update subSection handler function
exports.updateSubsection = async(req,res) => { 
    try{
        // data input
        const{subSectionId , title , description} = req.body
        // data validation
        if(!subSectionId || !title || !description){
            return res.status(401).json({
                success:false,
                message:'All Field Are Required'
            })
        }
        // update data
        const subSection = await SUBSECTION.findByIdAndUpdate(subSectionId,
                                                        {title},
                                                        {description},
                                                        {new:true}
        );
        // return response
        return res.status(200).json({
            success:true,
            message:'Updated The Section Successfully'
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error In Updating The Section'
        })
    }
}

// delete subSection handler function
exports.deleteSubsection = async(req,res) => {
    try{
        // get id
        const{subSectionId} = req.params
        // find by id and delete
        await SUBSECTION.findByIdAndDelete(subSectionId);
        // TODO: Do We Need To Delete The Entry From The Section Schema
        // return response
        return res.status(200).json({
            success:true,
            message:'Section Deleted Successfully'
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error In Deleting The Section'
        })
    }
}