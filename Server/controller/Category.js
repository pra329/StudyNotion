const CATEGORY = require('../models/Category');

// create Category
exports.createCategory = async(req , res) => {
    try{
        // fetch the data
        const {name , description} = req.body;
        // validation
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:'All Fields Are Required'
            })
        }
        // create The entry in the database
        const categoryDetails = await CATEGORY.create({
            name:name,
            description:description
        })
        console.log(categoryDetails);
        // return response
        return res.status(200).json({
            success:true,
            message:'Category Is Created Successfully'
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Error In Creating The Tag"
        })
    }
}
// get all Category
exports.showallCategory = async(req,res) => {
    try{
        const allCategory = await CATEGORY.find({},{name:true , description:true});
        return res.status(200).json({
            success:true,
            message:"All Tags Returned Successfully",
            allCategory
        })
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:'Error In Showing ALL The Tags'
        })
    }
}