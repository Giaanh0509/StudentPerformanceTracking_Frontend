import Expert from "../../assets/expert.png";
import { FaAngleDown } from "react-icons/fa6";


export const Navbar = () => {
    return (
        <div className="flex items-center justify-end gap-x-5">
            <img src={`${Expert}`} alt="" className="w-8 h-8 rounded-full border-2 border-black border-white" />
            <div className="flex flex-col">
                <div className="text-sm">Hoang anh</div>
                <div className="text-xs">Expert</div>
            </div>
            <FaAngleDown className="mr-5" />
        </div>
    )
}