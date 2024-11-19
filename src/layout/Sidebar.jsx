import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Teacher/logo1.png";
import { AiFillDashboard } from "react-icons/ai";
import { MdCoPresent } from "react-icons/md";
import { PiStudentDuotone } from "react-icons/pi";
import { CiCalendar } from "react-icons/ci";
import { LuCalendarDays } from "react-icons/lu";
import { MdOutlinePlayLesson, MdOutlineAssignment } from "react-icons/md";
import { LuActivitySquare } from "react-icons/lu";
import { MdOutlineClass, MdSubject } from "react-icons/md";
import { SiHtmlacademy } from "react-icons/si";
import { IoMdArrowDropdown } from "react-icons/io";
import { PiChalkboardTeacherDuotone } from "react-icons/pi";
import { LuBookPlus } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";



const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();
  const currentPath = location.pathname;
  const [activeMenu, setActiveMenu] = useState(currentPath);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  const menuItems = [
    { path: "/teacher/dashboard", role: "Teacher", name: "Dashboard", icon: <AiFillDashboard /> },
    {
      name: "Attendance",
      role: "Teacher",
      icon: <MdCoPresent />,
      submenu: [
        { path: "class-attendance", role: "Teacher", name: "Class Attendance", icon: <MdOutlineClass /> },
        { path: "subject-attendance", role: "Teacher", name: "Subject Attendance", icon: <MdSubject /> },
      ],
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
      ],
    },
    { path: "marked", role: "Teacher", name: "Assessment", icon: <MdOutlineAssignment /> },
    { path: "class-routine", role: "Teacher", name: "Routine", icon: <CiCalendar /> },
    { path: "student-info", role: "Teacher", name: "Student Directory", icon: <PiStudentDuotone /> },
    { path: "teacher-info", role: "Teacher", name: "Teacher Directory", icon: <PiChalkboardTeacherDuotone /> },
    // Add more menu items as needed
  ];

  const filteredMenuItems = menuItems.filter((item) => item.role === userRole);

  const handleMenuClick = (path) => {
    setShowSidebar(false);
    setActiveMenu(path);
  };

  const handleSubmenuToggle = (name) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  if (!userRole) return null;

  return (
    <div>
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className="fixed top-4  items-center z-50 p-2 bg-transparent  text-black rounded-lg md:hidden"
      >
        {showSidebar ? <RxHamburgerMenu className=" w-16"/> :<RxHamburgerMenu className=" w-16 h-7"/>}
      </button>

      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
        />
      )}

      <div
        className={`fixed top-0 left-0 w-[260px] h-full bg-gray-100 shadow-lg transition-transform duration-300 z-50 ${
          showSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-[70px] flex justify-center items-center bg-gray-200">
          <Link
            to={userRole === "Coordinator" ? "/coordinator/dashboard" : "/teacher/dashboard"}
            className="w-[180px] h-[50px]"
          >
            <img className="w-full h-full object-contain" src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="p-4">
          <ul className="space-y-2">
            {filteredMenuItems.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <>
                    <div
                      onClick={() => handleSubmenuToggle(item.name)}
                      className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
                        openMenus[item.name] ? "bg-gray-300" : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      <IoMdArrowDropdown
                        className={`transition-transform duration-300 ${
                          openMenus[item.name] ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                    <ul
                      className={`overflow-hidden transition-all duration-300 ${
                        openMenus[item.name] ? "max-h-screen" : "max-h-0"
                      }`}
                    >
                      {item.submenu.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            onClick={() => handleMenuClick(subItem.path)}
                            className={`flex items-center gap-2 pl-6 pr-4 py-2 rounded-lg ${
                              activeMenu === subItem.path ? "bg-gray-300" : "hover:bg-gray-300"
                            }`}
                          >
                            {subItem.icon}
                            <span>{subItem.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    onClick={() => handleMenuClick(item.path)}
                    className={`flex items-center gap-2 p-3 rounded-lg ${
                      activeMenu === item.path ? "bg-gray-300" : "hover:bg-gray-300"
                    }`}
                  >
                    {item.icon}
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
