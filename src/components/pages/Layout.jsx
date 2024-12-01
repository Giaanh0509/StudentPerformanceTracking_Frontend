import { Navbar } from "./Navbar"
import { SideBar } from "./SideBar"

export const Layout = () => {
    return(
        <div className='flex flex-row bg-neutral-200 overflow-hidden h-screen'>
            <SideBar> </SideBar>
            <Navbar></Navbar>
        </div>
    )
}