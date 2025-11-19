import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper';
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [filteredEmployee, setFilteredEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toLocaleDateString(),
            profileImage: (
              <img
                width={40}
                className="rounded-full"
                src={`http://localhost:5000/${emp.userId.profileImage}`}
                alt="profile"
              />
            ),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const records = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm)
    );
    setFilteredEmployees(records);
  };

  return (
    <div className="p-4 md:p-6">
      <div className="text-center">
        <h3 className="text-xl md:text-2xl font-bold">Manage Employees</h3>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4 mt-4">
        <input
          type="text"
          placeholder="Search by Employee Name"
          className="w-full md:w-auto px-4 py-2 border rounded"
          onChange={handleFilter}
        />
        <Link
          to="/admin-dashboard/add-employee"
          className="w-full md:w-auto px-4 py-2 bg-teal-600 rounded text-white text-center hover:bg-teal-700 transition-colors"
        >
          Add new Employee
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto">
        <DataTable
          columns={columns}
          data={filteredEmployee}
          progressPending={empLoading}
          pagination
          responsive
        />
      </div>
    </div>
  );
};

export default List;
