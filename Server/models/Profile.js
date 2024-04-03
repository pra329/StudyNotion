const mongoose= require('mongoose');

const profileSchema = new mongoose.Schema({
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
        trim:true,
    },
    contactNo:{
        type:Number,
        trim:true
    }
})

module.exports = mongoose.model("Profile" , profileSchema);