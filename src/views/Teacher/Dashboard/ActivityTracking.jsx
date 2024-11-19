import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { CiCalendar } from "react-icons/ci";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Pie chart data
const pieData = [
  { name: '2 activities are incomplete', value: 85 },
  { name: '2 activities are incomplete', value: 5 },
  { name: '2 activities are incomplete', value: 7 },
  { name: '2 activities are incomplete', value: 3 },
];

// Bar chart data
const barData = [
  { name: 'Sunday', classXGroupA: 85, classXGroupB: 65, classYGroupA: 85 },
  { name: 'Monday', classXGroupA: 90, classXGroupB: 80, classYGroupA: 70 },
  { name: 'Tuesday', classXGroupA: 65, classXGroupB: 75, classYGroupA: 60 },
  { name: 'Wednesday', classXGroupA: 85, classXGroupB: 90, classYGroupA: 80 },
  { name: 'Thursday', classXGroupA: 95, classXGroupB: 85, classYGroupA: 75 },
];

// Define colors for each group in the bar chart
const BAR_COLORS = ['#C4D3C9', '#E7E8D1', '#EAC9C4'];
const COLORS = ['#98C8AB', '#BB5042', '#C97368', '#D18A80']; // Pie chart colors

const ActivityTracking = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  return (
    <div className="flex flex-col lg:flex-row items-start gap-5 mb-4">
      {/* Pie Chart Section */}
      <div className="p-6 border rounded-md bg-white max-h-[476px] w-full lg:w-[45%]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#465049] font-bold text-[16px] md:text-[16px]">Today's Activity Tracking</span>
          <span className="text-[#A4A594] text-[12px] md:text-[12px]">From 1 January to Today</span>
        </div>

        <div className="flex justify-center">
          {/* Pie Chart */}
          <ResponsiveContainer width="100%" height={387}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={120}
                dataKey="value"
                labelLine={false}
                label={({ cx, cy }) => (
                  <text
                    x={cx}
                    y={cy - 10}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-center text-2xl md:text-3xl text-[#9e9e9b] font-bold"
                  >
                    85%
                    <tspan
                      x={cx}
                      dy="1.5em"
                      className="text-xs md:text-sm text-[#9e9e9b]"
                    >
                      Complete
                    </tspan>
                  </text>
                )}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#B9CBBE',
                  borderRadius: '8px',
                  padding: '10px',
                  border: 'none',
                  textAlign: 'center',
                }}
                formatter={(value, name) => [value, name]}
                cursor={false}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart Section */}
      <div className="p-6 bg-white rounded-md w-full border">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[#465049] text-lg md:text-xl font-semibold">Weekly Activity Tracking Progress</span>
          <div className="relative flex items-center gap-4">
            {/* Date Picker for Range */}
            <DatePicker
              selected={startDate}
              onChange={(update) => {
                const [start, end] = update;
                setStartDate(start);
                setEndDate(end);
              }}
              selectsRange
              startDate={startDate}
              endDate={endDate}
              className="appearance-none px-8 py-3 font-semibold outline-none border bg-transparent border-slate-300 rounded-md text-gray-700 focus:border-[#BB5042] w-full lg:w-[220px] pr-[40px] h-[45px]"
              placeholderText="Date Range"
              dateFormat="dd MMM"
            />
            <CiCalendar className="absolute w-7 h-7 text-[#BB5042] right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Bar Chart */}
        <div className="my-4">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <XAxis dataKey="name" tick={{ fontWeight: '700' }} />
              <YAxis label={{ value: 'Percentage', angle: -90, position: 'insideLeft', offset: 10 }} />
              <Legend
                align="right"
                layout="vertical"
                verticalAlign="middle"
                iconType="rect"
                iconSize={20}
              />
              <Bar dataKey="classXGroupA" fill={BAR_COLORS[0]} barSize={20} />
              <Bar dataKey="classXGroupB" fill={BAR_COLORS[1]} barSize={20} />
              <Bar dataKey="classYGroupA" fill={BAR_COLORS[2]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ActivityTracking;
