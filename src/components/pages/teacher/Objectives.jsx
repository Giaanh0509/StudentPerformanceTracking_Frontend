import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useState, createContext, useEffect } from "react";

export const Objectives = () => {
    return(
        <div className="flex flex-col h-full bg-white m-8 p-3">
            <div className="flex">
                <div className="text-3xl px-8 py-4 font-montserrat font-semibold">
                    Manage Objectives
                </div>
            </div>

            <div className="flex justify-between mb-3">
                <div className="mt-3 ml-7 mr-auto">
                    <select className="p-[8px] border-[1px] rounded-lg w-44 border-[#7fa195]" name="" id="">
                        <option value="all">Slect all objectives</option>
                        <option value="myself">Select my objectives</option>
                    </select>
                </div>
                <div className="mt-3">
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for objectives" />
                </div>
                <div className="flex items-center gap-x-2 p-2 bg-gradient-to-t rounded-lg from-[#8dbaaa] to-[#14ce90] m-3 text-white">
                    <IoIosAddCircle className="size-5" />
                    <button className="text-base font-montserrat font-medium">
                        Create New Objectives
                    </button>
                </div>
            </div>

        </div>
    )
}