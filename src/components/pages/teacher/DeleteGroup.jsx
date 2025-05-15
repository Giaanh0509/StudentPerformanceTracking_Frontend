import { deleteGroupContext } from "./Group"
import axios from "axios"
import { useEffect, useContext, useState } from "react";

export const DeleteGroup = ({ onSuccessDelete }) => {

    const { selectedGroupId } = useContext(deleteGroupContext);
    const { setDeletePopup } = useContext(deleteGroupContext);
    const { render, setRender } = useContext(deleteGroupContext);

    const handleButton = () => {
        setDeletePopup(false);
    }

    const deleteGroup = () => {
        axios.get(`https://student-be-production.up.railway.app/groups/delete/${selectedGroupId}`)
            .then(response => { 
                setDeletePopup(false);
                setRender(render + 1 );
                onSuccessDelete && onSuccessDelete();
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <div className="flex flex-col gap-y-4 bg-[#dee1e0] font-montserrat py-5 px-3 rounded-2xl w-[450px] shadow-xl border-[1px] border-[#6f7171]">
            <div className="flex justify-center text-center text-lg font-bold">Are you sure you want to delete this group?</div>
            <div className="flex justify-center text-red-500 text-sm font-semibold">If deleted, all related data will be removed.</div>
            <div className="flex justify-center font-semibold text-base gap-x-5 text-white mt-3">
                <button onClick={handleButton} className="py-2 px-3 rounded-lg bg-[#048e60]">Cancel</button>
                <button onClick={deleteGroup} className=" py-2 px-3 rounded-lg bg-[#bd0808]">Delete</button>
            </div>
        </div>
    )
}