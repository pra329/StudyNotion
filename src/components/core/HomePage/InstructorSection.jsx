import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa6";
import CTAButton from '../HomePage/Button'
const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex lg:flex-row sm:flex-col-reverse max-sm:flex-col-reverse gap-20 items-center'>
        <div className='lg:w-[700px] sm:w-[400px]'>
            <img src={Instructor} alt="Instructor Image" className='shadow-white object-contain lg:w-[500px] sm:w-[700px]'/>
        </div>
        <div className='lg:w-[700px] sm:w-[400px] flex flex-col gap-10'>
            <div className='text-4xl font-semibold lg:w-[700px] sm:w-[400px]'>
                Become an <HighlightText text={"instructor"}/>
            </div>
            <p className='font-medium text-[16px] w-[80%] text-richblack-300'>
            Instructors from around the world teach millions of students on StudyNotion. 
            We provide the tools and skills to teach what you love.
            </p>
            <div className='w-fit'>
            <CTAButton active={true} linkto={"/signup"}>
                <div className='flex flex-row gap-2 items-center'>
                    Start Learning Today
                    <FaArrowRight/>
                </div>
            </CTAButton>
            </div>
        </div>
      </div>
    </div>
  )
}

export default InstructorSection
