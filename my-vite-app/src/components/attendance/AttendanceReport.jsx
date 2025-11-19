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
    <div className="min-h-screen p-4 md:p-10 bg-white">
      <h2 className="text-center text-xl md:text-2xl font-bold mb-4">Attendance Report</h2>

      <div className="mb-4">
        <h3 className="text-lg md:text-xl font-semibold mb-2">Filter by Date</h3>
        <input
          type="date"
          className="border bg-gray-100 px-4 py-2 rounded w-full md:w-auto"
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
            <h3 className="text-lg md:text-xl font-semibold mb-2">{date}</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse" border='1' cellPadding='10'>
                <thead className="bg-gray-200">
                  <tr>
                    <th className="border px-2 py-2 text-sm md:text-base">S No</th>
                    <th className="border px-2 py-2 text-sm md:text-base">Date</th>
                    <th className="border px-2 py-2 text-sm md:text-base">Employee ID</th>
                    <th className="border px-2 py-2 text-sm md:text-base">Name</th>
                    <th className="border px-2 py-2 text-sm md:text-base">Department</th>
                    <th className="border px-2 py-2 text-sm md:text-base">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(records) &&
                    records.map((data, i) => (
                      <tr key={data.employeeId + i}>
                        <td className="border px-2 py-2 text-sm md:text-base">{i + 1}</td>
                        <td className="border px-2 py-2 text-sm md:text-base">{date}</td>
                        <td className="border px-2 py-2 text-sm md:text-base">{data.employeeId}</td>
                        <td className="border px-2 py-2 text-sm md:text-base">{data.employeeName}</td>
                        <td className="border px-2 py-2 text-sm md:text-base">{data.departmentName}</td>
                        <td className="border px-2 py-2 text-sm md:text-base">{data.status}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <button className='mt-4 px-4 py-2 border bg-gray-100 text-base md:text-lg font-semibold rounded hover:bg-gray-200 transition-colors' onClick={handleLoadmore}>Load More</button>
          </div>
        ))
      )}
    </div>
  );
};

export default AttendanceReport;

//<table className="w-full border border-gray-300" border='1' cellPadding='10'>
