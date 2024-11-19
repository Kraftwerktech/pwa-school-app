import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillDashboard } from "react-icons/ai";
import { MdCoPresent } from "react-icons/md";
import { PiStudentDuotone } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { TbCalendarTime } from "react-icons/tb";
import { GoPeople } from "react-icons/go";
import { PiMessengerLogoLight } from "react-icons/pi";
import { LuCalendarDays } from "react-icons/lu";
import { GrAnnounce } from "react-icons/gr";
import { MdOutlinePlayLesson, MdOutlineAssignment } from "react-icons/md";
import { LuActivitySquare } from "react-icons/lu";
import { MdOutlineClass, MdSubject } from "react-icons/md";
import { SiHtmlacademy } from "react-icons/si";
import { SiGooglemeet } from "react-icons/si";
import { VscRepo } from "react-icons/vsc";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiChalkboardTeacherDuotone } from "react-icons/pi";
import { LuBookPlus } from "react-icons/lu";
import { FiMinus } from "react-icons/fi";
import { MdAssignmentInd } from "react-icons/md";
import { GrResources } from "react-icons/gr";

import logo from '../assets/Teacher/logo1.png';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
 
  const location = useLocation();
  const currentPath = location.pathname; // Get current path

  // Set initial activeMenu based on location.pathname
  const [activeMenu, setActiveMenu] = useState(currentPath);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserData = () => {
      const role = localStorage.getItem('role') 

      setUserRole(role);
     
    };

    fetchUserData();
  }, []);

  const menuItems = [
    { path: "/teacher/dashboard", role: "Teacher", name: "Dashboard", icon: <AiFillDashboard /> },
    {
      name: "Attendance",
      role: "Teacher",
      icon: <MdCoPresent />,
      submenu: [
        { path: "class-attendance", role: "Teacher", name: "Class Attendance", icon: <MdOutlineClass /> },
        { path: "subject-attendance", role: "Teacher", name: "Subject Attendance", icon: <MdSubject /> }
      ]
    },
    {
      name: "Curriculum",
      role: "Teacher",
      icon: <SiHtmlacademy />,
      submenu: [
        { path: "teacherSyllabus", role: "Teacher", name: "Syllabus", icon: <LuCalendarDays /> },
        { path: "approveLesson", role: "Teacher", name: "Lesson Plan", icon: <MdOutlinePlayLesson /> },
        { path: "activiyttrack", role: "Teacher", name: "Activity Tracking", icon: <LuActivitySquare /> },
        { path: "createsyllabusapproved", role: "Teacher", name: "Create Syllabus", icon: <LuBookPlus /> },
      ]
    },
    { path: "marked", role: "Teacher", name: "Assessment", icon: <MdOutlineAssignment /> },
    { path: "class-routine", role: "Teacher", name: "Routine", icon: <CiCalendar /> },
    { path: "student-info", role: "Teacher", name: "Student Directory", icon: <PiStudentDuotone /> },
    { path: "teacher-info", role: "Teacher", name: "Teacher Directory", icon: <PiChalkboardTeacherDuotone /> },
    {
      name: "Guardian Collaboration",
      role: "Teacher",
      icon: <GoPeople />,
      submenu: [
        { path: "upcomming", role: "Teacher", name: "Arrange Meeting", icon: <SiGooglemeet /> },
        { path: "messagecollaboration", role: "Teacher", name: "Messaging", icon: <PiMessengerLogoLight /> },
      ]
    },
    { path: "announcement", role: "Teacher", name: "Announcement", icon: <GrAnnounce /> },
    { path: "/coordinator/dashboard", role: "Coordinator", name: "Dashboard", icon: <AiFillDashboard /> },
    { path: "student-dir", role: "Coordinator", name: "Student Directory", icon: <PiStudentDuotone /> },
    { path: "CoApprovedsyllabus", role: "Coordinator", name: "Syllabus", icon: <LuCalendarDays /> },
    { path: "substitute-scheduling", role: "Coordinator", name: "Substitute Scheduling", icon: <TbCalendarTime /> },
    { path: "teacherlist", role: "Coordinator", name: "Teacher Directory", icon: <LiaChalkboardTeacherSolid /> },
    { path: "assingsyllabus", role: "Coordinator", name: "Assign Syllabus", icon: <MdAssignmentInd /> },
    { path: "resourceallowcation", role: "Coordinator", name: "Resource Allocation", icon: <GrResources /> },
    { path: "CMeeting", role: "Coordinator", name: "Meetings", icon: <SiGooglemeet /> },
    { path: "coapprovedLesson", role: "Coordinator", name: "Lesson Plan", icon: <VscRepo /> },
    { path: "CAnnuncement", role: "Coordinator", name: "Announcements", icon: <GrAnnounce /> },
  ];

  const filteredMenuItems = menuItems.filter(item => item.role === userRole);

  const handleMenuClick = (path) => {
    setShowSidebar(false);
    setActiveMenu(path); // Update the active menu with the path
  };

  const handleSubmenuToggle = (name) => {
    setOpenMenus(prevState => ({
      ...prevState,
      [name]: !prevState[name]
    }));
  };

  if (!userRole) return null;

  return (
<div>
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded-lg"
      >
        {showSidebar ? 'Close' : 'Open'} Sidebar
      </button>

      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-[#22292f80] z-10 transition-opacity duration-200"
        />
      )}

      <div
        className={`fixed top-0 left-0 w-[260px] h-screen bg-[#F6F9F7] shadow-lg transition-transform duration-900 z-50 ${
          showSidebar ? 'translate-x-0' : '-translate-x-[260px] lg:translate-x-0'
        }`}
      >
        <div className="h-[70px] flex justify-center items-center">
        <Link to={userRole === "Coordinator" ? "/coordinator/dashboard" : "/teacher/dashboard"} className="w-[180px] h-[50px]">
            <img className="w-[200px] h-full" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="px-[16px] mt-2">
          <ul className="space-y-2">
            {filteredMenuItems.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <>
                    <div
                      onClick={() => handleSubmenuToggle(item.name)}
                      className={`flex justify-between items-center text-[#465049] w-[224px] h-[48px] rounded-lg font-normal pl-[14px] pr-[12px] py-4 cursor-pointer transition-colors duration-900 ${
                        openMenus[item.name] ? 'bg-[#465049] text-white' : 'bg-[#E4EBE6] hover:bg-[#465049] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-x-2">
                        <span className="text-[26px]">{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      <IoMdArrowDropdown className={`text-[20px] transition-transform duration-1000 ${openMenus[item.name] ? 'rotate-180' : ''}`} />
                    </div>
                    <ul
                      className={`overflow-hidden transition-all duration-900 ${openMenus[item.name] ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex} className="flex items-center pl-6  space-y-2">
                          <FiMinus className="text-[#868987]" />
                          <Link
                            to={subItem.path}
                            onClick={() => handleMenuClick(subItem.path)}
                            className={`text-[#465049] w-[200px] h-[35px] rounded-lg font-normal px-[16px] py-[10px] flex items-center transition-colors duration-900 ${
                              activeMenu === subItem.path ? 'bg-[#465049] text-white' : 'bg-[#E4EBE6] hover:bg-[#465049] hover:text-white'
                            }`}
                          >
                            <span className="text-[26px] mr-[1px]">{subItem.icon}</span>
                            <span className="text-[15px]">{subItem.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => handleMenuClick(item.path)}
                    className={`text-[#465049] w-[224px] h-[48px] rounded-lg font-normal pl-[12px] pr-[12px] py-4 flex items-center gap-x-2 transition-colors duration-900 ${
                      activeMenu === item.path ? 'bg-[#465049] text-white' : 'bg-[#E4EBE6] hover:bg-[#465049] hover:text-white'
                    }`}
                  >
                    <span className="text-[26px]">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
