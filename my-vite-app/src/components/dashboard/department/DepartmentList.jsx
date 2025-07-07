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

        <div className="p-5">
            <div className="text-center">
            <h3 className="text-10x1 font-bold">Manage Departments</h3>
            </div>
            <div className="flex justify-between items-center">
            <input type="text" 
                placeholder="Search by Dep Name" 
                className="px-6 py-0.5 border"
                onChange={handleSearch}

           />
            <Link to="/admin-dashboard/add-department" 
            className="px-4 py-1 bg-teal-600 rounded text-white">
                Add new Department
            </Link>
            </div>
            <div className="mt-5">
                <DataTable
                    columns={columns} data={filteredDepartments} pagination
                />
            </div>
      </div>
      }</>
    )
}

export default DepartmentList