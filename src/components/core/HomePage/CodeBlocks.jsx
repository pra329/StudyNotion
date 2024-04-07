import React, { useState } from 'react'
import CTAButton from "../HomePage/Button"
// import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa6";
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({position,heading,subHeading,ctabtn1,ctabtn2,codeblock,backgroundGradient,codeColor}) => {
    return (
    <div className={`flex ${position} my-20 relative justify-between gap-14 lg:gap-10`}>
        {/* Section 1 */}
        <div className='w-[100%] lg:w-[40%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-300 font-bold'>
                {subHeading}
            </div>
            <div className='flex flex-row gap-7 mt-7'>
                <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn1.btnText}
                        <FaArrowRight />
                    </div>
                </CTAButton>

                <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctabtn2.btnText}
                    </div>
                </CTAButton>
            </div>
        </div>
        {/* Section 2 */}
        <div className='h-fit flex flex-row text-10[px] w-[100%] py-4 lg:w-[500px] border-x-2 border border-y-2  border-x-richblack-600 border-y-richblack-800'>
            <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
            <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
           <TypeAnimation
            sequence={[codeblock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
           
            style = {
                {
                    whiteSpace: "pre-line",
                    display:"block",
                }
            }
           />
        </div>
        </div>
    </div>
  )
}

export default CodeBlocks
