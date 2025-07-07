import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceReport = () => {
  const [report, setReport] = useState({});
  const [limit] = useState(5); // Only used in query, no need for setLimit
  const [skip, setSkip] = useState(0);
  const [dateFilter, setDateFilter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const query = new URLSearchParams({ limit, skip });
        if (dateFilter) {
          query.append('date', dateFilter);
        }

        const response = await axios.get(
          `http://localhost:5000/api/attendance/report?${query.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.data.success) {
          if (skip === 0) {
            setReport(response.data.groupData);
          } else {
            setReport((prevData) => ({
              ...prevData,
              ...response.data.groupData,
            }));
          }
        }

        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    };

    fetchReport();
  }, [skip, dateFilter, limit]);

  const handleLoadmore = () => {
    setSkip((prevSkip) => prevSkip + limit)
  }

  return (
    <div className="min-h-screen p-10 bg-white">
      <h2 className="text-center text-2xl font-bold mb-4">Attendance Report</h2>

      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-1">Filter by Date</h3>
        <input
          type="date"
          className="border bg-gray-100 px-2 py-1"
          value={dateFilter}
          onChange={(e) => {
            setDateFilter(e.target.value);
            setSkip(0); // Reset to first page on filter change
          }}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        report &&
        Object.entries(report).map(([date, records]) => (
          <div key={date} className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{date}</h3>
            <table className="" border='1' cellPadding='10'>
              <thead className="bg-gray-200">
                <tr>
                  <th className="border px-2 py-1">S No</th>
                  <th className="border px-2 py-1">Date</th>
                  <th className="border px-2 py-1">Employee ID</th>
                  <th className="border px-2 py-1">Name</th>
                  <th className="border px-2 py-1">Department</th>
                  <th className="border px-2 py-1">Status</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(records) &&
                  records.map((data, i) => (
                    <tr key={data.employeeId + i}>
                      <td className="border px-2 py-1">{i + 1}</td>
                      <td className="border px-2 py-1">{date}</td>
                      <td className="border px-2 py-1">{data.employeeId}</td>
                      <td className="border px-2 py-1">{data.employeeName}</td>
                      <td className="border px-2 py-1">{data.departmentName}</td>
                      <td className="border px-2 py-1">{data.status}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <button className='px-4 py-2 border bg-gray-100 text-lg font-semibold' onClick={handleLoadmore}>Load More</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AttendanceReport;

//<table className="w-full border border-gray-300" border='1' cellPadding='10'>
