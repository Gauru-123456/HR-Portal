import { Link } from "react-router-dom"
import DataTable from 'react-data-table-component'
import { useEffect, useState } from "react"
import axios from 'axios';
import { columns, DepartmentButtons } from "../../../utils/DepartmentHelper"


const DepartmentList = () => {

    const [departments, setDepartments] = useState([])
    const [depLoading, setDeploading] = useState(false)
    const [filteredDepartments, setFilteredDepartments] = useState([])


    const onDepartmentDelete = async () => {
        fetchDepartments()

    }

    const fetchDepartments = async () => {
            setDeploading(true)
            try{
                const response = await axios.get('http://localhost:5000/api/department', {
                    headers: {
                        "Authorization" : `Bearer ${localStorage.getItem('token')}`
                    }
                })
                if(response.data.success) {
                    let sno = 1;
                    console.log(response.data)
                        const data = await response.data.departments.map((dep) => (
                            {
                                _id: dep._id,
                                sno: sno++,
                                dep_name: dep.dep_name,
                                action: (<DepartmentButtons DepId={dep._id} onDepartmentDelete={onDepartmentDelete} />)

                            }
                        ))
                        setDepartments(data)
                        setFilteredDepartments(data)
                }
            }   catch (error) {
                if(error.response && !error.response.data.success) {
                    alert(error.response.data.error)
                }
            } finally {
                setDeploading(false)
            }
        }

    useEffect(() => {

        fetchDepartments()
    }, [])

    const handleSearch = (e) => {
    const records = departments.filter((dep) =>
        dep.dep_name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredDepartments(records);
    };


    return (
        <>{depLoading ? <div>Loading ...</div> : 

        <div className="p-4 md:p-6">
            <div className="text-center">
                <h3 className="text-xl md:text-2xl font-bold">Manage Departments</h3>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-4">
                <input 
                    type="text" 
                    placeholder="Search by Dep Name" 
                    className="w-full md:w-auto px-4 py-2 border rounded"
                    onChange={handleSearch}
                />
                <Link 
                    to="/admin-dashboard/add-department" 
                    className="w-full md:w-auto px-4 py-2 bg-teal-600 rounded text-white text-center hover:bg-teal-700 transition-colors"
                >
                    Add new Department
                </Link>
            </div>
            <div className="mt-6 overflow-x-auto">
                <DataTable
                    columns={columns} 
                    data={filteredDepartments} 
                    pagination
                    responsive
                />
            </div>
        </div>
      }</>
    )
}

export default DepartmentList