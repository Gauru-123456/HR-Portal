import { useAuth } from "../../context/authContext"

const Navbar = () => {
    const {user, logout} = useAuth()
    return (
        <div className="flex items-center text-white justify-between h-12 bg-teal-600 px-5 lg:px-8">
            <p className="text-sm md:text-base ml-12 lg:ml-0">Welcome {user.name}</p>
            <button className="px-3 py-1 md:px-4 text-sm md:text-base bg-teal-700 hover:bg-teal-800 rounded transition-colors" onClick={logout}>Logout</button>
        </div>
    )
}

export default Navbar