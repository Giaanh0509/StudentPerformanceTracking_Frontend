import { useEffect, useContext, useState } from "react";
import axios from "axios"
import { deleteObjectiveContext } from "./Objectives";

export const DeleteObjective = ({ onSuccessDelete }) => {

    const { selectedObjectiveId } = useContext(deleteObjectiveContext);
    const { setDeletePopup} = useContext(deleteObjectiveContext);
    const { render, setRender } = useContext(deleteObjectiveContext);

    const handleButton = () => {
        setDeletePopup(false);
    }

    console.log(selectedObjectiveId);

    const deleteGroup = () => {
        axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/objectives/delete/objectiveId=${selectedObjectiveId}`)
            .then(response => { 
                setDeletePopup(false);
                setRender(render + 1 );
                onSuccessDelete && onSuccessDelete();
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    console.log(selectedObjectiveId);

    return(
        <div className="flex flex-col gap-y-4 bg-[#dee1e0] font-montserrat py-5 px-3 rounded-2xl w-[450px] shadow-xl border-[1px] border-[#6f7171]">
            <div className="flex justify-center text-center text-lg font-bold">Are you sure you want to delete this objective?</div>
            <div className="flex justify-center text-red-500 text-sm font-semibold">If deleted, all related data will be removed.</div>
            <div className="flex justify-center font-semibold text-base gap-x-5 text-white mt-3">
                <button  onClick={handleButton} className="py-2 px-3 rounded-lg bg-[#048e60]">Cancel</button>
                <button  onClick={deleteGroup} className=" py-2 px-3 rounded-lg bg-[#bd0808]">Delete</button>
            </div>
        </div>
    )
}