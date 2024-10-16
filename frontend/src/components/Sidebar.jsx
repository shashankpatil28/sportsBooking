import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="h-full bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold">NEXUS</h2>
      <nav className="mt-8">
        <ul>
          <li className="mb-4">
            <Link to="/" className="text-white hover:text-gray-400">Dashboard</Link>
          </li>
          <li className="mb-4">
            <Link to="/schedule" className="text-white hover:text-gray-400">Schedule</Link>
          </li>
          <li className="mb-4">
            <Link to="/customers" className="text-white hover:text-gray-400">Customers</Link>
          </li>
          <li className="mb-4">
            <Link to="/attendance" className="text-white hover:text-gray-400">Attendance</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
