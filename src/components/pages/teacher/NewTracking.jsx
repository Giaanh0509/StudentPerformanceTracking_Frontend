import { useState, useContext, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { createTrackingContext } from "./ObjectiveDetails";

export const NewTracking = () => {

    const { setCreateTrackingPopup }  = useContext(createTrackingContext);

    const handleCloseModal = () => {
        setCreateTrackingPopup(false);
    };

    return(
        <div className="flex flex-col gap-y-4 bg-white font-montserrat p-4 rounded-lg w-[500px] h-auto">
                <div className="flex justify-between">
                    <h2 className="font-bold text-xl text-[#03966c]">Create New Tracking</h2>
                    <button className="text-gray-600 hover:text-red-500 transition text-2xl">
                        <TiDelete onClick={handleCloseModal} className="size-7" />
                    </button>
                </div>
                <div className="border-[1px] border-b-gray-400"></div>

                <div className="flex flex-col gap-1">
                    <span className="font-semibold">Name:</span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter tracking name"
                        className={`border-2 p-2 w-full rounded-lg`} />
                </div>

                <div className="flex flex-col gap-1">
                    <span className="font-semibold">Decription:</span>
                    <textarea
                        name="description"
                        placeholder="Enter tracking description"
                        className={`border-2 p-2 w-full rounded-lg resize-none`}
                        rows="3"
                    ></textarea>
                </div>
                
                <div className="flex justify-center bg-gradient-to-l from-[#4df1bb] to-[#1c8764]  rounded-lg">
                    <button className="py-2 px-4 text-white">Create</button>
                </div>
        </div>
    )
}