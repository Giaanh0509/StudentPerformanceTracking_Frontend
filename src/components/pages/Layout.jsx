import { Outlet } from "react-router-dom"
import { Navbar } from "./Navbar"
import { SideBar } from "./SideBar"

export const Layout = () => {
    return(
        <div className='flex bg-neutral-200 overflow-hidden h-screen'>
            <SideBar> </SideBar>
            <div className="flex flex-col w-full">
                <div className="h-20 bg-white flex items-center justify-end">
                    <Navbar></Navbar> 
                </div>  
                <Outlet></Outlet>
            </div>
            
        </div>
    )
}