import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { SideBarTeacher } from "./teacher/SideBarTeacher"
import { SideBar } from "./expert/SideBar"
import { useState, createContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SideBarLearner } from "./learner/SideBarLearner";
import axios from "axios";

export const Layout = () => {
    

    const location = useLocation();
    const pathname = location.pathname;
    let title = "Dashboard";

    if (pathname.startsWith("/teacher/subjects")) {
        title = "Subjects";
    } else if (pathname.startsWith("/teacher/objectives")) {
        title = "Objectives";
    } else if (pathname.startsWith("/teacher/groups")) {
        title = "Groups";
    }

    if (pathname.startsWith("/learner/subjects")) {
        title = "Subjects";
    } else if (pathname.startsWith("/learner/achievement")) {
        title = "Achievement";
    } else if (pathname.startsWith("/learner/groups")) {
        title = "Groups";
    }

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



    return (
        <div className='flex bg-neutral-200 overflow-hidden h-screen'>
            {userInfo.roleId === 1 ? (
                <SideBarTeacher />
            ) : userInfo.roleId === 3 ? (
                <SideBar />
            ) : <SideBarLearner/> }
            <div className="flex flex-col w-full">
                <div className="h-16 bg-white flex justify-between items-center mt-2 mx-6 rounded-lg shadow-lg shadow-slate-400">
                    <div className="ml-10 text-xl font-montserrat font-semibold">{title}</div>
                    <Navbar></Navbar>
                </div>
                <Outlet></Outlet>
            </div>

        </div>
    )
}