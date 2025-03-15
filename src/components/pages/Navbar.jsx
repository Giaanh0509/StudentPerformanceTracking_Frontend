import Expert from "../../assets/expert.png";
import { FaAngleDown } from "react-icons/fa6";
import { useState, createContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { IoNotifications } from "react-icons/io5";

export const Navbar = () => {

    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState({
        id: "",
        username: "",
        roleId: ""
    }
    );

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        const storedUserLoginDTO = localStorage.getItem('userLoginDTO');

        if (storedUserLoginDTO) {
            try {
                const userLoginDTO = JSON.parse(storedUserLoginDTO);

                setUserInfo(userLoginDTO);
            } catch (e) {
                console.error('Error parsing userLoginDTO from localStorage:', e);
            }
        } else {
            console.log('No user info found in localStorage');
        }
    }, []);

    const getRoleName = (roleId) => {
        switch (roleId) {
            case 1:
                return "Teacher";
            case 2:
                return "Learner";
            case 3:
                return "Expert";
            default:
                return "Unknown";
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("userLoginDTO");
        window.location.href = "/signin";
    };

    return (
        <div className="flex items-center justify-end gap-x-3">
            <IoNotifications size={25} className="mr-3"/>
            <img src={`${Expert}`} alt="" className="w-10 h-10 rounded-full border-2 border-gray-400" />
            <div className="flex flex-col">
                <div className="text-sm">{userInfo.username}</div>
                <div className="text-xs">{getRoleName(userInfo.roleId)}</div>
            </div>
            <FaAngleDown 
                className="ml-2 mr-5 cursor-pointer" 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
            />
            {isDropdownOpen && (
                <div className="absolute right-0 top-12 bg-white shadow-lg rounded-lg w-32 p-2 border">
                    <button 
                        onClick={handleLogout} 
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}