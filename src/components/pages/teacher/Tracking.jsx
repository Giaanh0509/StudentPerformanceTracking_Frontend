import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { modalContext } from "./SubjectTeacher";

export const Tracking = () => {

    const handleCloseModal = () => {

    }

    return (
        <div className="flex flex-col gap-y-4 bg-white font-montserrat p-4 rounded-lg w-[1100px] h-4/5">
            <div className="flex justify-between text-xl font-medium">
                <div className="text-xl">
                    Tracking:
                    <p className="font-bold ml-3 text-[#4dad8c]"></p>
                </div>
                <button onClick={handleCloseModal} className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete className="size-7" />
                </button>
            </div>
            <div className="border-[1px] border-b-gray-400"></div>

            <div className="flex flex-col gap-1">
                    <span className="font-semibold">Name:</span>
                    <input
                        type="text"
                        name="name"
                        // value={group.name}
                        // onChange={(e) => handleChange(e)}
                        placeholder=""
                        className={`border-2 p-2 w-60 border-gray-300 rounded-lg`} />
            </div>

            <div className="flex flex-col gap-1">
                    <span className="font-semibold">Decription:</span>
                    <textarea
                        name="description"
                        // value={group.description}
                        // onChange={handleChange}
                        className={`border-2 p-2 w-60 rounded-lg resize-none`}
                        rows="3"
                    ></textarea>
            </div>

            <div></div>
        </div>
    )
}