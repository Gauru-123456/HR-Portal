import React, { useEffect, useState } from "react"; // ✅ FIXED: moved useState into same import
import { useParams, useNavigate } from "react-router-dom"; // ✅ Added useNavigate
import axios from "axios"; // ✅ FIXED: axios was missing

const EditDepartment = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ✅ FIXED: added navigate for redirection

  // ✅ FIXED: changed [] to {} — array ❌ for object state
  const [department, setDepartment] = useState({
    dep_name: '',
    description: ''
  });

  const [depLoading, setDeploading] = useState(false);

  // ✅ FIXED: added axios import and corrected fetch
  useEffect(() => {
    const fetchDepartments = async () => {
      setDeploading(true);
      try {
        const response = await axios.get(`http://localhost:5000/api/department/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDeploading(false);
      }
    };

    fetchDepartments();
  }, [id]); // ✅ FIXED: added [id] to useEffect dependency array

  // ✅ FIXED: handleChange added
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  // ✅ FIXED: handleSubmit added
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/department/edit/${id}`, department, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });


      if (response.data.success) {
        alert("Department updated successfully!");
        navigate("/admin-dashboard/departments");
      }

    } catch (error) {
      const message = error?.response?.data?.error || "Update failed.";
      alert(message);
    }
  };

  return (
    <>
      {depLoading ? (
        <div>Loading....</div>
      ) : (
        <div className='max-w-md mx-auto mt-10 bg-white p-4 md:p-8 rounded-md shadow-md'>
          <h2 className='text-xl md:text-2xl font-bold mb-6'>Edit Department</h2>

          {/* ✅ FIXED: added handleSubmit to form */}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="dep_name" className='text-sm font-medium text-gray-700'>
                Department Name
              </label>
              <input
                type="text"
                name='dep_name'
                onChange={handleChange} // ✅ FIXED: added
                value={department.dep_name}
                placeholder='Department Name'
                className='mt-1 w-full p-2 border border-gray-300 rounded-md'
                required
              />
            </div>

            <div className="mt-4">
              <label htmlFor="description" className='block text-sm font-medium text-gray-700'>
                Description
              </label>
              <textarea
                name="description"
                value={department.description} // ✅ FIXED: added value binding
                onChange={handleChange} // ✅ FIXED: added
                placeholder='Description'
                className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
                rows="4"
              />
            </div>

            <button
              type='submit'
              className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded'
            >
              Update Department {/* ✅ FIXED: changed button text */}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default EditDepartment;
