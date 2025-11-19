import { FaUser } from "react-icons/fa"
import { useAuth } from "../../context/authContext"

const Summary = () => {
        const {user} = useAuth()
    return(
        <div className="p-4 md:p-6">
            <div className="rounded flex bg-white shadow-md p-4">
                <div className={`text-3xl flex justify-center items-center bg-teal-600 text-white px-4 py-4 rounded`}>
                    <FaUser />
                </div>
                <div className="ml-4 flex flex-col justify-center">    
                    <p className="text-base md:text-lg font-semibold">Welcome Back</p>
                    <p className="text-lg md:text-xl font-bold">{user.name}</p>
                </div>
            </div>
        </div>
    )
}

export default Summary

//You can put this bg-teal-600 in div {icon}

//pi-4 py-1 remove this and use ml-4 to create gap between logo and text in grid