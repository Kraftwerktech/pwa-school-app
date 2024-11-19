import React from 'react';
import Absence from '../../../assets/Teacher/icons/Absence.png';
import Present from '../../../assets/Teacher/icons/Vector.png';
import { PiStudent } from 'react-icons/pi';
const AttendanceOverview = () => {
  
  return (
    <div className="border border-[#E8E8E8] rounded-lg p-3">
    <h3 className="ml-4 md:ml-10 text-[18px] md:text-[20px] text-[#465049] font-semibold mt-2 md:mt-2">Attendance Overview</h3>
    
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-[16px] mx-4 md:mx-2 mb-2 md:mb-2 mt-3 md:mt-5">
      
      {/* Total Students Card */}
      <div className="h-[150px] rounded-lg bg-[#A7BEAE] p-4 flex flex-col items-center">
        <div className="text-center mb-2 md:mb-4">
          <span className="block text-[20px] md:text-[22px] text-[#465049] font-semibold">Total Students</span>
        </div>
        <div className="flex gap-6 md:gap-[40px] items-center">
          <div className="flex items-center justify-center bg-[#77877C] w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full">
            <PiStudent className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] text-white" />
          </div>
          <span className="block text-[40px] md:text-[40px] text-[#465049] font-bold">80</span>
        </div>
      </div>
  
      {/* Today’s Present Card */}
      <div className="h-[150px] rounded-lg bg-[#daefe0] p-4 flex flex-col items-center">
        <div className="text-center mb-4 md:mb-4">
          <span className="block text-[20px] md:text-[22px] text-[#465049] font-semibold">Today’s Present</span>
        </div>
        <div className="flex gap-6 md:gap-[40px] items-center">
          <div className="flex items-center justify-center bg-[#08A647] w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full">
            <img src={Present} className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] text-white" />
          </div>
          <span className="block text-[40px] md:text-[40px] text-[#465049] font-bold">70</span>
        </div>
      </div>
  
      {/* Today’s Absence Card */}
      <div className="h-[150px] rounded-lg bg-[#F8EEEC] p-4 flex flex-col items-center">
        <div className="text-center mb-4 md:mb-4">
          <span className="block text-[20px] md:text-[22px] text-[#465049] font-semibold">Today’s Absence</span>
        </div>
        <div className="flex gap-6 md:gap-[40px] items-center">
          <div className="flex items-center justify-center bg-[#C97368] w-[50px] h-[50px] md:w-[60px] md:h-[60px] rounded-full">
            <img src={Absence} className="w-[30px] h-[30px] md:w-[50px] md:h-[50px] text-white" />
          </div>
          <span className="block text-[40px] md:text-[40px] text-[#465049] font-bold">10</span>
        </div>
      </div>
  
    </div>
  </div>
  
    
  );
};

export default AttendanceOverview;
