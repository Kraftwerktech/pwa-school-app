import React from 'react';

const ExamRoutine = () => {
  const exams = [
    { class: "Class VII | Science | A", time: "9:30 am - 12:30 pm", room: "203" },
    { class: "Class VII | Science | A", time: "9:30 am - 12:30 pm", room: "210" },
    { class: "Class VIII | Math | B", time: "1:00 pm - 4:00 pm", room: "105" },
    { class: "Class IX | English | A", time: "9:30 am - 12:30 pm", room: "301" },
    { class: "Class X | History | B", time: "1:00 pm - 4:00 pm", room: "102" },
  ];

  return (
    <div className="bg-white rounded-md border mb-10 border-gray-300 p-5 shadow-sm w-full max-w-full">
      <h3 className="font-semibold text-gray-700 text-xl md:text-[22px] lg:text-[25px]">
        Today's Exam Routine
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4 mb-3">
        {exams.map((exam, index) => (
          <div 
            key={index} 
            className="text-center bg-[#F4F4EA] hover:bg-slate-200 p-4 rounded-lg transition-all duration-200"
          >
            <p className="font-semibold text-base md:text-lg text-gray-700">{exam.class}</p>
            <p className="text-sm md:text-base text-gray-600 font-medium">{exam.time}</p>
            <p className="text-sm md:text-base text-gray-600 font-medium">Room: {exam.room}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamRoutine;
