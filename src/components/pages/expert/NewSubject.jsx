import { TiDelete } from "react-icons/ti";
import { useState, useContext } from "react";
import { modalContext } from "./Subject"
import SubjectService from "../../../services/SubjectService";

export const NewSubject = () => {

    const { showModal, setShowModal } = useContext(modalContext);

    const [subject, setSubject] = useState({
        id: "",
        name: "",
    });

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSubject({ ...subject, [e.target.name]: value });
    }

    const saveSubject = (e) => {
        e.preventDefault();
        SubjectService.saveSubject(subject)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    console.log(showModal);

    return (
        <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg w-[750px] h-2/3">
            <div className="flex justify-between">
                <div className="font-bold text-xl">Create new subject</div>
                <TiDelete onClick={handleCloseModal} className="size-7"/>
            </div>
            <div className="border-[1px] border-b-gray-400"></div>
            <div className="flex gap-x-5">
                Subject's name: 
                <input 
                type = "text" 
                name = "name"
                value= {subject.name}
                onChange={(e) => handleChange(e)}
                className="border-2 p-2" />
            </div>
            <div className="flex justify-end">
                <button onClick={saveSubject} className="bg-lime-300 py-2 px-4 rounded-lg">Create</button>
            </div>
        </div>
    )
}