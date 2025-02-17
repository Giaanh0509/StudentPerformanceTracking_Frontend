import { TiDelete } from "react-icons/ti";
import { useEffect, useContext, useState } from "react";
import { editSubjectContext } from "./SubjectDetail";
import axios from "axios";

export const EditSubject = () => {

    const { subject, setSubject } = useContext(editSubjectContext);
    const { editPopup, setEditPopup } = useContext(editSubjectContext);

    const [formData, setFormData] = useState({
        name: subject.name,
        description: subject.description,
    });

    useEffect(() => {
        setFormData({
            id: subject.id,
            name: subject.name,
            description: subject.description,
        });
    }, [subject]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:8080/subjects/update/${subject.id}`, formData);
            setSubject((prevSubject) => ({ ...prevSubject, ...formData }));
            setEditPopup(false);
        } catch (error) {
            console.error("Error updating subject:", error);
        }
    };

    return(
        <div className="flex flex-col gap-y-4 bg-white font-montserrat p-6 rounded-2xl w-[500px] shadow-lg">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl">Edit subject: <span className="text-[#03966c]">{subject.name}</span></h2>
                <button className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete className="size-7"/>
                </button>
                
            </div>

            <div className="border-b border-gray-300"></div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold">Description:</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={`border-2 p-2 w-full rounded-lg resize-none`}
                    rows="4"
                ></textarea>
            </div>

            <div className="flex justify-center bg-gradient-to-l from-[#3ccb9b] to-[#1c8764] mt-1 rounded-lg">
                <button
                    onClick={handleSave}
                    className=" py-2 px-6 rounded-lg text-white hover:opacity-90 transition"
                >
                    Save
                </button>
            </div>
        </div>
    )
}