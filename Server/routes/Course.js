// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {createCourse,getAllCourses,getCourseDetails} = require('../controller/Course')

// Categories Controllers Import
const {showallCategory,createCategory,categoryPageDetails} = require("../controller/Category")

// // Sections Controllers Import
const {createSection,updateSection,deleteSection} = require("../controller/Section")

// // Sub-Sections Controllers Import
const {createSubsection,updateSubsection,deleteSubsection} = require("../controller/Subsection")

// // Rating Controllers Import
// const {createRating,getAverageRating,getAllRating} = require("../controller/RatingAndReview")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// // Edit Sub Section
// router.post("/updateSubSection", auth, isInstructor, updateSubsection)
// // Delete Sub Section
// router.post("/deleteSubSection", auth, isInstructor, deleteSubsection)
// // Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubsection)
// // Get all Registered Courses
// router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showallCategory)
// router.post("/getCategoryPageDetails", categoryPageDetails)
// router.post("/createRating", auth, isStudent, createRating)
// router.get("/getAverageRating", getAverageRating)
// router.get("/getReviews", getAllRating)

module.exports = router