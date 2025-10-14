import { useAdminAuth } from "@/context/AdminAuthContext";
import { useNavigate } from "@tanstack/react-router"
import { FaArrowRightFromBracket } from "react-icons/fa6"

const AdminLogoutButton = () => {
    const navigate = useNavigate();
    const {logout} = useAdminAuth();

    const handleLogout = ()=> {
        logout()
        navigate({to: '/'})
    }

  return (
        <button 
        onClick={handleLogout}
        className="absolute transition hover:scale-105 top-4 right-4 h-10 rounded-full flex items-center justify-center cursor-pointer w-10 bg-yellow-500 text-white">
            <FaArrowRightFromBracket/>
        </button>
  )
}
export default AdminLogoutButton