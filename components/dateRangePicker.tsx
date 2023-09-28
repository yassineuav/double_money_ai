'use clinet'
import React, { useState } from 'react';
import { format, isSameMonth, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

const DateRangePicker = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const currentDate = new Date();
  
    const daysInMonth = eachDayOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    });
  
    const handleDayClick = (date) => {
      setSelectedDate(date);
    };
      
  return (
    <div className="relative max-w-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4  text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
            </svg>
        </div>
  <input  type="text" className="bg-gray-700 border border-gray-300 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-1 placeholder-gray-400 " 
  placeholder="Select date" />
        
    </div>
  )
}

export default DateRangePicker
