import React, { useState } from 'react';
import { RxCrossCircled } from 'react-icons/rx';

const ReminderSection = () => {
  const [showModal, setShowModal] = useState(false);

  const reminders = [
    { text: "Today you didn't complete 100% activity at class IX, group-B", link: "See activity" },
    { text: "Today you have a parent meeting with class X, group-B at 4pm", link: "See activity" },
    { text: "Today you didn't complete 100% activity at class IX, group-B", link: "See activity" },
  ];

  return (
    <div className="w-full mb-8 border border-gray-300 rounded-lg bg-white shadow-sm">
      <div className="flex justify-between items-center p-4">
        <h2 className="text-gray-700 font-bold text-xl lg:text-2xl">Reminder</h2>
        <div
          className="text-gray-500 text-sm lg:text-base cursor-pointer hover:text-gray-700"
          onClick={() => setShowModal(true)}
        >
          See all
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-4">
        {reminders.map((reminder, index) => (
          <div key={index} className="bg-[#F8EEEC] p-4 rounded-lg shadow-sm">
            <p className="text-gray-700 text-sm lg:text-base">{reminder.text}</p>
            <a href="#" className="text-blue-600 text-sm lg:text-base hover:underline">
              {reminder.link}
            </a>
          </div>
        ))}
      </div>

      {/* Modal to display all reminders */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-2xl lg:max-w-3xl p-6 lg:p-10 h-[70vh] overflow-y-auto rounded-lg shadow-lg relative">
            <button
              className="absolute top-4 right-4 text-[#BB5042] text-2xl"
              onClick={() => setShowModal(false)}
            >
              <RxCrossCircled className="w-6 h-6" />
            </button>
            <h2 className="text-gray-700 text-center font-bold text-xl lg:text-2xl mb-4">All Reminders</h2>
            <div className="space-y-4">
              {reminders.map((reminder, index) => (
                <div key={index} className="bg-[#F8EEEC] p-4 rounded-lg">
                  <p className="text-gray-700 text-sm lg:text-base">{reminder.text}</p>
                  <a href="#" className="text-blue-600 hover:underline">{reminder.link}</a>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReminderSection;
