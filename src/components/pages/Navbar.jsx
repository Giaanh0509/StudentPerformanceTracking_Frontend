import Expert from "../../assets/expert.png";
import { FaAngleDown } from "react-icons/fa6";


export const Navbar = () => {
    return(
        <div className="flex items-center justify-end gap-x-5">
           <img src={`${Expert}`} alt="" className="w-12 h-12 rounded-full border-2 border-black border-white" />
           <div className="">Expert_1</div>
           <FaAngleDown className="mr-5"/>
        </div>
    )
}