import React, { useState, useEffect, useRef } from 'react';
import { FaList, FaCaretDown } from 'react-icons/fa';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CiTrash } from 'react-icons/ci';
import { Link, useLocation } from 'react-router-dom';
import teacher from '../assets/Teacher/teacher.jpg'; // Replace with the appropriate icon or image for notifications

const Header = ({ showSidebar, setShowSidebar }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New message from admin', timestamp: '2 minutes ago', icon: teacher },
    { id: 2, message: 'Assignment deadline approaching', timestamp: '1 hour ago', icon: teacher },
    { id: 3, message: 'New class schedule available', timestamp: 'Yesterday', icon: teacher },
    { id: 4, message: 'Meeting at 3 PM', timestamp: 'Yesterday', icon: teacher },
  ]);
  const [unreadCount, setUnreadCount] = useState(notifications.length);
  const [filter, setFilter] = useState('all');
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');
  const image = localStorage.getItem('image') || teacher;
  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    setShowDropdown(false);
    setShowNotifications(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showDropdown) setShowDropdown(false);
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
    setUnreadCount((prev) => Math.max(0, prev - 1));
  };

  const filteredNotifications =
    filter === 'unread' ? notifications.slice(0, unreadCount) : notifications;

  return (
    <div className="fixed w-full z-10 bg-[#F6F9F7]">
      <div className="h-[65px] flex justify-between items-center px-5 shadow-sm">
        {/* Sidebar Toggle */}
        <div
          onClick={() => setShowSidebar(!showSidebar)}
          className="w-[35px] flex lg:hidden h-[35px] rounded-sm text-black hover:shadow-indigo-500/50 justify-center items-center cursor-pointer"
        >
        </div>

        {/* Search Input */}
        <div className="hidden sm:block flex-grow max-w-md">
          <input
            className="w-full px-3 py-2 outline-none border bg-transparent border-slate-300 rounded-md text-[#333] focus:border-indigo-500"
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          {/* Notifications */}
          <div className="relative" ref={notificationRef}>
            <IoMdNotificationsOutline
              className={`text-2xl cursor-pointer ${
                showNotifications ? 'text-blue-500' : 'text-[#BB5042]'
              }`}
              onClick={toggleNotifications}
            />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
                {unreadCount}
              </span>
            )}
            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-[300px] bg-white shadow-lg rounded-md py-2 max-h-[300px] overflow-y-auto">
                <div className="px-4 py-2 text-lg font-semibold text-gray-700 border-b">
                  Notifications
                </div>
                <div className="flex gap-2 px-4 py-2">
                  <button
                    className={`px-4 py-1 border rounded-md ${
                      filter === 'all' ? 'bg-indigo-500 text-white' : 'text-gray-600'
                    }`}
                    onClick={() => setFilter('all')}
                  >
                    All
                  </button>
                  <button
                    className={`px-4 py-1 border rounded-md ${
                      filter === 'unread' ? 'bg-indigo-500 text-white' : 'text-gray-600'
                    }`}
                    onClick={() => setFilter('unread')}
                  >
                    Unread
                  </button>
                </div>
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="flex justify-between items-center px-4 py-2 border-b last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={notification.icon}
                          alt="icon"
                          className="w-8 h-8 rounded-full"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {notification.message}
                          </p>
                          <span className="text-xs text-gray-500">
                            {notification.timestamp}
                          </span>
                        </div>
                      </div>
                      <CiTrash
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDeleteNotification(notification.id)}
                      />
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">No notifications</div>
                )}
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative flex items-center gap-3 cursor-pointer" ref={profileRef}>
            <img
              src={image}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-indigo-500"
              onClick={toggleDropdown}
            />
            <div onClick={toggleDropdown} className="text-sm">
              <p className="font-bold text-gray-800">{name || 'User'}</p>
              <span className="text-xs text-gray-500">{role || 'Role'}</span>
            </div>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-[200px] bg-white shadow-lg rounded-md py-2">
                <Link
                  to="/teacher/dashboard/teacher-profile"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/teacher/dashboard/verifyidentity"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Reset Password
                </Link>
                <Link
                  to="/teacher/dashboard/settings"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </Link>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
