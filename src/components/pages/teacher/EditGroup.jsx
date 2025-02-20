import { TiDelete } from "react-icons/ti";
import { useEffect, useContext, useState } from "react";
import { editGroupContext } from "./Student";
import axios from "axios";

export const EditGroup = () => {
    return(
        <div className="flex flex-col gap-y-4 bg-white font-montserrat p-6 rounded-2xl w-[500px] shadow-lg">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl">Edit subject: <span className="text-[#03966c]"></span></h2>
                <button className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete className="size-7"/>
                </button>
                
            </div>
        </div>
    )
}