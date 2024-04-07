import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import TimelineImage from '../../../assets/Images/TimelineImage.png'
const TimelineSection = () => {
    const timeline = [
        {
            Logo:Logo1,
            heading:'Leadership',
            Description:"Fully committed to the success company"
        },
        {
            Logo:Logo2,
            heading:'Leadership',
            Description:"Fully committed to the success company"
        },  
        {
            Logo:Logo3,
            heading:'Leadership',
            Description:"Fully committed to the success company"
        }, 
         {
            Logo:Logo4,
            heading:'Leadership',
            Description:"Fully committed to the success company"
        },
    ]
    return (
    <div>
      <div className='flex flex-col lg:flex-row gap-20 mb-20 items-center'>
        <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-3'>
        {
            timeline.map((ele,i)=>{
                return(
                    <div className="flex flex-col lg:gap-3" key={i}>
                <div className="flex gap-6" key={i}>
                  <div className="w-[52px] h-[52px] bg-white rounded-full flex justify-center items-center shadow-[#00000012] shadow-[0_0_62px_0]">
                    <img src={ele.Logo} alt="" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[18px]">{ele.heading}</h2>
                    <p className="text-base">{ele.Description}</p>
                  </div>
                </div>
                <div
                  className={`hidden ${
                    timeline.length - 1 === i ? "hidden" : "lg:block"
                  }  h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                ></div>
              </div>
                )
            })
        }
        </div>
        <div className='relative shadow shadow-blue-200 gradient'>
            <img src={TimelineImage} alt='TimeLine Image' className='shadow-white object-cover h-fit '/>
            <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                    <p className='text-3xl font-bold'>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>Years Of Expereince</p>
                </div>
                <div className='flex flex-row gap-5 px-7 items-center'>
                <p className='text-3xl font-bold'>250</p>
                <p className='text-caribbeangreen-300 text-sm'>Types Of Courses</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
