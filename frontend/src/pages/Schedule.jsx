import React, { useState } from 'react';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import ScheduleGrid from '../components/ScheduleGrid';

const Schedule = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header onDateChange={handleDateChange} />
        <div className="p-4">
          <h1 className="text-2xl font-bold">Schedule</h1>
          <ScheduleGrid date={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
