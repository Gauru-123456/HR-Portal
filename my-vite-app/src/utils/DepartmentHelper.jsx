import { useNavigate } from "react-router-dom";
import axios from "axios";


export const columns = [
    {
        name: 'S No',
        selector: (row) => row.sno,
        width: '80px',
        center: true,
    },
    {
        name: 'Department Name',
        selector: (row) => row.dep_name,
        sortable: true,
        grow: 2,
        wrap: true,
    },
    {
        name: 'Action',
        selector: (row) => row.action,
        width: '200px',
        center: true,
    },
]

export const DepartmentButtons = ({DepId, onDepartmentDelete}) => {
    const navigate = useNavigate()

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete ?")
        if(confirm) {

        try {
                const response = await axios.delete(`http://localhost:5000/api/department/${id}`, {
                  headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`,
                  },
                });
        
                if (response.data.success) {
                  onDepartmentDelete()
                }
              } catch (error) {
                if (error.response && !error.response.data.success) {
                  alert(error.response.data.error);
                }
              }
            }
    }

    return (
        <div className="flex gap-2">
            <button 
                className="px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors text-sm"
                onClick={() => navigate(`/admin-dashboard/department/${DepId}`)}
            >
                Edit
            </button>
            <button 
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                onClick={() => handleDelete(DepId)}
            >
                Delete
            </button>
        </div>
    )
}