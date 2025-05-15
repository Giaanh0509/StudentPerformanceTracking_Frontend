import { TiDelete } from "react-icons/ti";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { studentContext } from "./LearnerDashboard";


export const AddInformationStudent = () => {

    const { studentId } = useContext(studentContext);
    const { setPopup } = useContext(studentContext);

    const [student, setStudent] = useState({
        id: studentId,
        name: "",
        dateOfBirth: "",
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setStudent({ ...student, [e.target.name]: value });
    }

    const handleSave = async () => {
        try {
            await axios.put(`https://studentperformancetrackingbackend-production.up.railway.app/students/update/${student.id}`, student);
            setPopup(false);
        } catch (error) {
            console.error("Error updating subject:", error);
        }
    };

    return (
        <div className="flex flex-col gap-y-4 bg-white font-montserrat p-4 rounded-lg w-[600px] h-auto">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl text-[#03966c]">Student Information</h2>
                <button className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete className="size-7" />
                </button>
            </div>
            <div className="border-[1px] border-b-gray-400"></div>

            <div className="flex flex-col gap-1">
                    <span className="font-semibold">Name:</span>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={student.name}
                        onChange={(e) => handleChange(e)}
                        className="border-2 p-2 w-full rounded-lg" />
            </div>

            <div className="flex flex-col gap-1 gap-y-2">
                <span className="font-semibold">Date of birth:</span>
                <input
                    type="date"
                    className="border-2 p-2 rounded-lg w-[130px]"
                    name="dateOfBirth"
                    onChange={(e) => handleChange(e)}
                    value={student.dateOfBirth}
                />
            </div>

            <div className="flex justify-center mt-2 bg-gradient-to-l from-[#32c997] to-[#1c8764]  rounded-lg">
                <button onClick={handleSave} className="py-2 px-4 text-white">Save</button>
            </div>
        </div>
    )
}