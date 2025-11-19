import axios from "axios";
import { useNavigate } from "react-router-dom";


export const columns = [
    {
        name: 'S No',
        selector: (row) => row.sno,
        width: '70px',
        center: true,
    },
    {
        name: 'Name',
        selector: (row) => row.name,
        sortable: true,
        grow: 1,
        wrap: true,
    },
    {
        name: 'Image',
        selector: (row) => row.profileImage,
        width: '80px',
        center: true,
    },
    {
        name: 'Department',
        selector: (row) => row.dep_name,
        sortable: true,
        grow: 1,
        wrap: true,
    },
    {
        name: 'DOB',
        selector: (row) => row.dob,
        sortable: true,
        width: '120px',
    },
    {
        name: 'Action',
        selector: (row) => row.action,
        center: true,
        minWidth: '280px',
    },
]

export const fetchDepartments = async () => {
    let departments
            try{
                const response = await axios.get('http://localhost:5000/api/department', {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(response.data.success) {
                    departments = response.data.departments
                }
            }   catch (error) {
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }

            }
            return departments
        }

// employees for salary form
export const getEmployees = async (id) => {
    let employees
            try{
                const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                })
                console.log(response)
                if(response.data.success) {
                    employees = response.data.employees
                }
            }   catch (error) {
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }

            }
            return employees
        }        

        export const EmployeeButtons = ({Id}) => {
            const navigate = useNavigate()        
        
            return (
                <div className="flex flex-wrap gap-1">
                    <button 
                        className="px-2 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-xs"
                        onClick={() => navigate(`/admin-dashboard/employees/${Id}`)}
                    >
                        View
                    </button>
                    <button 
                        className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
                        onClick={() => navigate(`/admin-dashboard/employees/edit/${Id}`)}
                    >
                        Edit
                    </button>
                    <button 
                        className="px-2 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-xs"
                        onClick={() => navigate(`/admin-dashboard/employees/salary/${Id}`)}
                    >
                        Salary
                    </button>
                    <button 
                        className="px-2 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-xs"
                        onClick={() => navigate(`/admin-dashboard/employees/leaves/${Id}`)}
                    >
                        Leave
                    </button>
                </div>
            )
        }

