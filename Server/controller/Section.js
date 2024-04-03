const SECTION = require('../models/Section');
const COURSE = require('../models/Course');
const SUBSECTION = require('../models/Subsection')
// create section handler function
exports.createSection = async(req,res) => {
    try{
        // data fetch
        const{sectionName , courseId} = req.body;
        // data validation
        if(!sectionName || !courseId){
            return res.status(401).json({
                success:false,
                message:'All Fields Are Required'
            })
        }
        // create section
        const newSection = await SECTION.create({sectionName});
        // update course with the section ObjectId
        const updateCourseDetails = await COURSE.findByIdAndUpdate(
                                                courseId,
                                                {
                                                    $push:{
                                                        courseContent:newSection._id,
                                                    },
                                                },
                                                {new:true},
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec();
        // return response
        return res.status(200).json({
            success:true,
            updateCourseDetails,
            message:'Section Created Successfully'
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:'Error In Creating The Section'
        })
    }
}
// update section handler function
exports.updateSection = async(req,res) => { 
    try{
        // data input
        const{sectionName,sectionId} = req.body;
        // data validation
        if(!sectionName || !sectionId){
            return res.status(401).json({
                success:false,
                message:'All Field Are Required'
            })
        }
        // update data
        const section = await SECTION.findByIdAndUpdate(sectionId,
                                                        {sectionName},
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

// delete section handler function
exports.deleteSection = async(req,res) => {
    try{
        // get id
        const{sectionId} = req.body
        // find by id and delete
        await SECTION.findByIdAndDelete(sectionId);
        // TODO: Do We Need To Delete The Entry From The Course
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