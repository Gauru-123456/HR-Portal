import axios from "axios";
import {useState} from 'react';       //We remove React because we using react 19 latest version
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState(null);
   const {login} = useAuth()
   const navigate = useNavigate()

   const handleSubmit = async (e) => {
      e.preventDefault();
      //alert("ok")
      try{
         const response = await axios.post(
         "http://localhost:5000/api/auth/login",  //We put 5000 to run backend part 5173 is for frontend only
         { email, password }
       );

         console.log("Server Response:", response.data); // ✅ Add this
         
       if(response.data.success) {
         //alert("Successfully login")
         console.log("✅ User Logged In:", response.data.user);
         console.log("✅ Token Saved:", response.data.token);

         login(response.data.user, response.data.token); 
         localStorage.setItem("token", response.data.token)

         //console.log("User Role:", response.data.user.role);

         //response.data.user.role = "employee"; //This line i am putting to redirect to employee dashboard manually.
         if (response.data.user.role === "admin") { //if password admin it redirect to admin-dashboard
            navigate('/admin-dashboard')
         } else {
            navigate("/employee-dashboard")
         }
       }
      } catch(error) {
        if(error.response && !error.response.data.success) { //Now we put this whole line to authcontext.jsx
         setError(error.response.data.error)
       } else {
         setError("Server Error")
       }
      }
   };
   return(
   <div
      className="flex flex-col items-center min-h-screen justify-center px-4
   bg-gradient-to-b from-teal-600 from-50% to-gray-100 to-50% space-y-6"
   >
      <h2 className="font-pacific text-2xl md:text-3xl text-white text-center">
         Employee Management System
      </h2>
      <div className="border shadow p-6 w-full max-w-md bg-white rounded-lg">
         <h2 className="text-xl md:text-2xl font-bold mb-4">Login</h2>
         {error && <p className="text-red-500">{error}</p>}
         <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor='email' className="block text-gray-700">Email</label>
            <input
               type="email"
               className="w-full px-3 py-2 border"
               placeholder="Enter Email"
               onChange={(e) => setEmail(e.target.value)}
               required
            />
           </div>
           <div className="mb-4">
               <label htmlFor='password' className="block text-gray-700">Password</label>
               <input
                 type="password"
                 className="w-full px-3 py-2 border"
                 placeholder="*****"
                 onChange={(e) => setPassword(e.target.value)}
                 required //When I write required so that you have to fill this section
               />
          </div>         
          <div className="mb-4 flex items-center justify-between">
            <label className="inline-flex items-center">
               <input type="checkbox" className="form-checkbox" />
               <span className="m1-2 text-gray-700">Remember me</span>
            </label>
            <a href="#" className="text-teal-600">
               Forgot password?
            </a>
          </div>
          <div className="mb-4">
            <button
               type="submit"
               className="w-full bg-teal-600 text-white py-2"
            >
               Login
            </button>
          </div> 
       </form>
      </div>
    </div>
   )
}



export default Login