const mongoose = require('mongoose');

const courseProgress = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
    },
    completedVideo:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subsection"
    }]
});

module.exports = mongoose.model('courseProgess' , courseProgress);