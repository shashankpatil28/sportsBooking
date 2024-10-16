import React, { useEffect, useState } from 'react';
import { fetchBookings } from '../services/api';

const ScheduleGrid = ({ date }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBookings = async () => {
      try {
        setLoading(true);
        const data = await fetchBookings(date);
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };
    
    loadBookings();
  }, [date]);

  if (loading) {
    return <div>Loading schedule...</div>;
  }

  return (
    <div className="overflow-x-auto mt-4">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Time</th>
            <th className="px-4 py-2">Court 1</th>
            <th className="px-4 py-2">Court 2</th>
            <th className="px-4 py-2">Court 3</th>
            <th className="px-4 py-2">Court 4</th>
            {/* Add more courts as needed */}
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td className="border px-4 py-2">{new Date(booking.timeStart).getHours()} AM</td>
              <td className="border px-4 py-2">{booking.court.name}</td>
              {/* Repeat for each court */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleGrid;
