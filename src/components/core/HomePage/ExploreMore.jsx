import React, { useState } from 'react'
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';

const ExploreMore = () => {
    const tabsName = [
        "Free",
        "New to coding",
        "Most popular",
        "Skills paths",
        "Career paths"
    ]
    const[currentTab,setCurrentTab] = useState(tabsName[0]);
    const[courses,setCourses] = useState(HomePageExplore[0].courses);
    const[currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);
    const setMyCards = (value) => {
        setCurrentTab(value)
        const result = HomePageExplore.filter((course)=>course.tag === value)
        setCourses(result[0].courses)
        setCurrentCard(result[0].courses[0].heading)
    }
    return (
    <div>
      <div className='text-4xl font-semibold text-center mt-8'>
        Unlock the <HighlightText text={"power of code"}/>
      </div>

      <p className='text-center text-richblack-300 text-sm text-[16px] mt-3'>
        Learn to build anything you can imagine
      </p>

      <div className='mt-5 flex lg:flex-row sm:flex-col lg:rounded-full max-sm:flex-col bg-richblack-800 mb-5 border-richblack-100 px-1 py-1'>
        {
            tabsName.map((element,index) => {
                return (
                    <div className={`text-[16px] flex flex-row items-center gap-2 ${currentTab === element ? "bg-richblack-900 text-richblack-5 font-medium" : "text-richblack-200"} rounded-full transition-all duration-200 cursor-pointer
                    hover:bg-richblack-900  hover:text-richblack-5 px-7 py-2`} key={index} onClick={()=>setMyCards(element)}>
                        {element}
                    </div>
                )
            })
        }
      </div>
      <div className='hidden lg:block lg:h-[200px]'></div>

    {/* course card ka group */}   
    <div className='lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between 
    flex-wrap w-full lg:left-1 lg:-translate-y-[50%] text-black 
    lg:mb-0  mb-9 lg:px-0 px-3'>
  {
      courses.map(  (element, index) => {
          return (
              <CourseCard 
              key={index}
              cardData = {element}
              currentCard = {currentCard}
              onClick = {()=>{setCurrentCard(element.heading)}}
              />
          )
      } )
  }
    </div>
    </div>
  )
}

export default ExploreMore
