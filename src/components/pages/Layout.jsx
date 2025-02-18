import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { SideBarTeacher } from "./teacher/SideBarTeacher"
import { SideBar } from "./expert/SideBar"
import { useState, createContext, useEffect } from "react";


export const Layout = () => {

    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    }  
    );

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

    
    return(
        <div className='flex bg-neutral-200 overflow-hidden h-screen'>
            {userInfo.roleId === 1 ? (
                <SideBarTeacher />
            ) : userInfo.roleId === 3 ? (
                <SideBar />
            ) : null}
            <div className="flex flex-col w-full">
                <div className="h-14 bg-white flex items-center justify-end">
                    <Navbar></Navbar> 
                </div>  
                <Outlet></Outlet>
            </div>
            
        </div>
    )
}