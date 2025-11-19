import { useEffect, useState} from "react";
import { fetchDepartments, getEmployees } from "../../utils/EmployeeHelper";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Add = () => {
    const [salary, setSalary] = useState({
    employeeId: null,
    basicSalary: 0,
    allowances: 0,
    deductions: 0,
    payDate: null,
    });

    const [departments, setDepartments] = useState(null)
    const [employees, setEmployees] = useState(null)
    const navigate = useNavigate(); // ✅ Add this line here

    useEffect(() => {
        const getDepartments = async () => {
            const departments = await fetchDepartments()
            setDepartments(departments)
            }
            getDepartments()
    }, [])

    const handleDepartment = async (e) => {
        const emps = await getEmployees(e.target.value)
        console.log("Fetched employees:", emps); // 👈 Add this
        setEmployees(emps)
    }


    const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === 'image') {
    setSalary((prevData) => ({ ...prevData, [name]: files[0] }));
  } else {
    setSalary((prevData) => ({ ...prevData, [name]: value }));
  }
  };


    const handleSubmit = async (e) => {
  e.preventDefault();

  const formDataObj = new FormData();
  Object.keys(salary).forEach((key) => {
    formDataObj.append(key, salary[key]);
  });

  try {
    const response = await axios.post(
      `http://localhost:5000/api/salary/add`,
      formDataObj,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (response.data.success) {
      navigate("/admin-dashboard/employees");
    }
  } catch (error) {
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
};

    return (
        <>{departments ? (
        <div className="max-w-4xl mx-auto mt-10 bg-white p-4 md:p-8 rounded-md shadow-md">
            <h2 className="text-xl md:text-2xl font-bold mb-6">Add Salary</h2>
            <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* Department */}      
              <div>   
                <label className="block text-sm font-medium text-gray-700">
                    Department
              </label>
              <select
                    name="department"
                    onChange={handleDepartment}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
                >
                    <option value="">Select Department</option>
                    {departments.map(dep => (
                        <option key={dep._id} value={dep._id}>{dep.dep_name}</option>
                    ))}
             </select>
              </div>

              {/* employee */}      
              <div>             
                <label className="block text-sm font-medium text-gray-700">
                    Employee    
              </label>
              <select
                name="employeeId"
                onChange={handleChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Employee</option>
                {employees && employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                {emp.userId?.name || 'Unknown'}  
                </option>
                 ))}
                </select>

              </div>

             {/* Designation */}
             <div>
                <label className="block text-sm font-medium text-gray-700">
                    Basic Salary
                </label>
                <input
                    type="number"
                    name="basicSalary"
                    onChange={handleChange}
                    placeholder="basic salary"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
               />
              </div>

             {/* Salary */}
             <div>
             <label className="block text-sm font-medium text-gray-700">
                    Allowances
             </label>
             <input
                    type="number"
                    name="allowances"
                    onChange={handleChange}
                    placeholder="allowances"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
               />
             </div>

             {/* Deductions */}
             <div>
             <label className="block text-sm font-medium text-gray-700">
                    Deductions
             </label>
             <input
                    type="number"
                    name="deductions"
                    onChange={handleChange}
                    placeholder="deductions"
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
               />
             </div>

            {/* Pay Date */}
             <div>
               <label className="block text-sm font-medium text-gray-700">
                    Pay Date
              </label>
             <input
                    type="date"
                    name="payDate"
                    onChange={handleChange}
                    className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
                    required
               />
             </div>
             
              
         </div>


         <button
                type="submit"
                className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded-md"
            >
              Update Employee 
         </button>
     </form>
   </div>
   ) : <div> Loading... </div>}</>
    )
}

export default Add;
