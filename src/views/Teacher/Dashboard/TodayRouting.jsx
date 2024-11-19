import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ActivityModal from './ActivityModal'; // Import Modal Component
import { Link } from 'react-router-dom';

const TodayRouting = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false); // Control modal visibility
  const [selectedActivity, setSelectedActivity] = useState(null); // Store selected activity details

  const subjects = [
    { period: '1st', time: '10:00 am - 10:45 am', subject: 'Bengali', class: 'V - B', buttonText: 'Activity' },
    { period: '2nd', time: '11:00 am - 11:35 am', subject: 'N/A', class: 'V - A', buttonText: 'Activity' },
    { period: '3rd', time: '11:40 am - 12:25 pm', subject: 'BGS', class: 'V - A', buttonText: 'Activity' },
    { period: '4th', time: '12:30 pm - 1:15 pm', subject: 'Economics', class: 'IX-Group 1', buttonText: 'Activity' },
    { period: '5th', time: '1:15 pm - 2:00 pm', subject: 'BGS', class: 'VI - A', buttonText: 'Activity' },
    { period: '6th', time: '2:15 pm - 3:00 pm', subject: 'Bengali', class: 'V - B', buttonText: 'Activity' },
  ];

  // Handle date selection from the calendar
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  // Open the modal and pass activity details
  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setModalOpen(true);
  };

  return (
    <div className="bg-white mt-5 border border-gray-300 rounded-md pb-5 pt-5 mb-4">
      <div className="flex flex-col md:flex-row gap-4 px-4">
        {/* Left side - Calendar */}
        <div className="w-full md:w-1/2 lg:w-[530px]">
          <h3 className="font-semibold text-2xl text-[#465049] mb-5">Today’s Routing</h3>

          {/* Display Calendar with selected date */}
          <Calendar
            value={selectedDate}
            onChange={handleDateChange}
            className="mt-5 w-full p-4 border border-[#FFFF] rounded-md calendar-custom"
            tileClassName={({ date, view }) => {
              // Highlight Fridays and Saturdays in red
              if (view === 'month' && (date.getDay() === 5 || date.getDay() === 6)) {
                return 'text-[#BB5042]';
              }
              // Add full rounding to the selected date
              if (selectedDate.toDateString() === date.toDateString()) {
                return 'bg-[#BB5042] text-white rounded-full';
              }
              return '';
            }}
          />

          <Link to="/teacher/dashboard/routineCalender">
            <button className="hover:bg-[#EAC9C4] ml-4 mt-4 px-5 py-2 border border-[#BB5042] rounded-md text-[#BB5042]">
              View Academic Calendar
            </button>
          </Link>
        </div>

        {/* Right side - Subject schedule */}
        <div className="w-full">
          <h3 className="text-end mr-5 mt-3 text-lg sm:text-xl text-[#A4A594]">Weekly Routine</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mr-4 mt-4">
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="flex flex-col justify-between items-center text-center h-80 bg-gray-50 p-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              >
                {/* Top Section */}
                <div className="mt-2">
                  <p className="font-bold text-xl sm:text-2xl mb-3 text-gray-800">{subject.period}</p>
                  <p className="text-gray-600 text-md sm:text-lg mb-5">{subject.time}</p>
                </div>

                {/* Middle Section - Subject Name and Class Name */}
                <div className="flex flex-col items-center">
                  <p className={`text-lg font-bold mb-5 ${subject.subject === 'N/A' ? 'text-gray-400' : 'text-[#BB5042]'}`}>
                    {subject.subject}
                  </p>
                  <p className="text-gray-700 text-md font-semibold">{subject.class}</p>
                </div>

                {/* Bottom Section - Button */}
                {subject.subject !== 'N/A' ? (
                  <button
                    onClick={() => handleActivityClick(subject)}
                    className="border border-[#BB5042] text-[#BB5042] text-md sm:text-lg rounded-lg px-4 py-2 mb-5 transition duration-200 hover:bg-red-100"
                  >
                    {subject.buttonText}
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-200 border border-gray-400 text-gray-400 text-md sm:text-lg rounded-lg px-4 mb-5 py-2 cursor-not-allowed"
                  >
                    {subject.buttonText}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Render the ActivityModal and pass props */}
      <ActivityModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        activity={selectedActivity}
      />
    </div>
  );
};

export default TodayRouting;
