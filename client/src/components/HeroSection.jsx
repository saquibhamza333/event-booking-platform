import React from 'react'
import { IoArrowRedoOutline } from "react-icons/io5";
import { FaAsterisk } from "react-icons/fa";

const HeroSection = () => {
  return (
    <div>
    <div className='flex gap-3 mt-8 ml-12'>
        <h1 className="text-8xl text-white font-bold w-3/4 text-left shadow-lg transform transition duration-500 ease-in-out hover:scale-105">
  GET READY TO EXPERIENCE THE BEST EVENTS
</h1>
<div className='flex flex-col gap-4  ml-8 w-[250px]'>
    <FaAsterisk className='text-orange-500 text-4xl ' />
    <h3 className='text-white font-semibold leading-tight '>BUYING TICKETS THROUGH OUR PLATFORM IS EASY AND CONVENIENCE</h3>
</div>


    </div>

<div className="flex items-center justify-center w-[500px] h-[200px] gap-6 ml-32 ">
  <IoArrowRedoOutline className="text-orange-500 text-9xl" />
  <p className="text-white  text-left leading-relaxed ">
    WELCOME TO OUR TICKETING PLATFORM, YOUR ONE-STOP-SHOP FOR ALL YOUR EVENT-NEEDS! WHETHER YOU'RE LOOKING TO ATTEND A EVENTS
  </p>
</div>


    </div>
  )
}

export default HeroSection