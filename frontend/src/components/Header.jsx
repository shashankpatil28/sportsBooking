import React from 'react';

const Header = ({ onDateChange }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <div>
        <input
          type="date"
          className="border p-2 rounded"
          onChange={(e) => onDateChange(e.target.value)}
        />
      </div>
      <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">New Customer</button>
      </div>
    </div>
  );
};

export default Header;
