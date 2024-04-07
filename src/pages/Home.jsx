import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/Button';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/common/Footer'
const Home = () => {
  return (
    <div>
      {/* Section 1 */}
      <div className='relative mx-auto flex flex-col w-11/12 items-center max-w-maxContent text-white justify-between'>
        <Link to={"/signup"}>
            <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95'>
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all duration-200 group-hover:bg-richblack-900 '>
                    <p>Become an Instructor </p>
                    <FaArrowRight />
                </div>
            </div>
        </Link>
         
         <div className='text-center text-4xl font-semibold mt-7'>
            Empower Your Future With <HighlightText text={"Coding Skills"}/>
         </div>

         <div className='mt-4 w-[90%] text-center text-lg font-bold text-richblack-300'>
         With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
         </div>

         <div className='flex flex-row gap-7 mt-8'>
            <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
            <CTAButton active={false} linkto={"/login"}>Book A Demo</CTAButton>
         </div>
         
         <div className='mx-3 my-12'>
          <video muted loop autoPlay >
            <source src={Banner} type='video/mp4'/>
          </video>
         </div>

         {/* Code Section 1 */}
         <div>
          <CodeBlocks position={"lg:flex-row sm:flex-col max-sm:flex-col"} heading={<div className='text-4xl font-semibold'>
            Unlock Your <HighlightText text={"Coding Potential"}/> With Our Online Courses
          </div>}
          subHeading={
            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"
          }
          ctabtn1={
            {
              btnText:"try it yourself",
              linkto:"/signup",
              active:true
            }
          }
          ctabtn2={
            {
              btnText:"learn more",
              linkto:"/login",
              active:false
            }
          }
          codeblock={`<!DOCTYPE html> \n <html>\n <head><title>Example</title> </head>\n<body>\n<h1><a href="/">Header</a>\n <h1><a href="/">Header</a></h1> \n <nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a> \n </nav>`}
          codeColor={"text-yellow-25"}
          />
         </div>

          {/* Code Section 2 */}
          <div>
          <CodeBlocks position={"lg:flex-row-reverse sm:flex-col max-sm:flex-col"} 
          heading={<div className='w-[100%] text-4xl font-semibold lg:w-[50%]'>
          Start <HighlightText text={"coding in seconds"}/>
          </div>}
          subHeading={
            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          }
          ctabtn1={
            {
                btnText: "Continue Lesson",
                linkto: "/signup",
                active: true,
            }
          }
          ctabtn2={
            {
                btnText: "learn more",
                linkto: "/login",
                active: false,
            }
        }
          codeblock={`<!DOCTYPE html> \n <html>\n <head><title>Example</title></head>\n<body>\n<h1><a href="/">Header</a>\n <h1><a href="/">Header</a></h1> \n <nav><a href="one/">One</a><a href="two/">Two</a><a href="three/">Three</a> \n </nav>`}
          codeColor={"text-white"}
          />
         </div>

      </div>
      {/* Section 2 */}
      <div className='bg-pure-greys-5 text-richblack-700'>
        <div className='homepage-bg h-[325px]'>
          <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
            <div className='h-[150px]'></div>
            <div className='flex flex-row gap-7 text-white'>
              <CTAButton active={true} linkto={"/signup"}>
                <div className='flex items-center gap-3'>
                  Explore Full Catalog
                  <FaArrowRight/>
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                <div>
                  Learn More
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
        <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>
          <div className='flex lg:flex-row sm:flex-col max-sm:flex-col gap-10 mb-10 mt-[95px] lg:px-10 sm:px-[300px] max-sm:px-[300px]'>
            <div className='text-4xl font-semibold lg:w-[600px] sm:w-[400px] max-sm:w-[380px] max-sm:px-[10px]'>
            Get the skills you need for a <HighlightText text={"job that is in demand"}/> 
            </div>
            <div className='flex flex-col gap-10 lg:w-[50%] sm:w-[100%] items-start max-sm:px-2'>
            <div className='text-[16px]'>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</div>
          <CTAButton active={true}>Learn More</CTAButton>
          </div>
          </div>  
          <TimelineSection/>
          <LearningLanguageSection/>
        </div>
      </div>
      {/* Section 3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>
        <InstructorSection/>
        <h2 className='text-center text-4xl font-semibold mt-10 '>Review from other learner</h2>
      </div>
      <Footer/>
    </div>
  )
}

export default Home
