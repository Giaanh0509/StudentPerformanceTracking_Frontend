import { modalContext } from "./Student";
import { useState, useContext, useEffect } from "react";
import StudentService from "../../../services/StudentService";
import { TiDelete } from "react-icons/ti";

export const HandleStudent = () => {

    const { showModal, setShowModal } = useContext(modalContext);
    const { students, setStudents } = useContext(modalContext);
    const { id } = useContext(modalContext);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="flex flex-col gap-y-4 bg-white font-montserrat p-4 rounded-lg w-[1000px] h-2/3">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl text-[#03966c]">Group join requests</h2>
                <button onClick={handleCloseModal} className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete className="size-7" />
                </button>
            </div>

            <div className="border-[1px] border-b-gray-400"></div>

        </div>
    )
}