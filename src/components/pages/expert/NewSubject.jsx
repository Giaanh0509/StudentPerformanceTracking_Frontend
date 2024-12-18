import { TiDelete } from "react-icons/ti";
import { useState, useContext, useEffect } from "react";
import { modalContext } from "./Subject"
import SubjectService from "../../../services/SubjectService";

export const NewSubject = () => {

    const { showModal, setShowModal } = useContext(modalContext);

    const { subjects, setSubjects } = useContext(modalContext);

    const [errorMessage, setErrorMessage] = useState("");

    const [subject, setSubject] = useState({
        id: "",
        name: "",
        createDate: "",
        userId: ""
    });

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSubject({ ...subject, [e.target.name]: value });
    }

    useEffect(() => {
        const userLoginDTO = localStorage.getItem('userLoginDTO');
        if (userLoginDTO) {
            try {
                const user = JSON.parse(userLoginDTO);
                setSubject((prevSubject) => ({
                    ...prevSubject,
                    userId: user.id
                }));
            } catch (error) {
                console.error("Error parsing userLoginDTO from localStorage:", error);
            }
        }
    }, []);

    const saveSubject = (e) => {
        e.preventDefault();

        if (!subject.name) {
            setErrorMessage("Subject's name is required.");
            return;
        }

        const currentDate = new Date().toISOString().split('T')[0];
        const newSubject = {
            ...subject, 
            createDate: currentDate
        };

        console.log(newSubject);

        setErrorMessage("");

        SubjectService.saveSubject(newSubject)
            .then((response) => {

                setSubjects((prevSubjects) => [...prevSubjects, response.data]);  
                console.log(response.data);              
                setShowModal(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg w-[750px] h-2/3">
            <div className="flex justify-between">
                <div className="font-bold text-xl">Create new subject</div>
                <TiDelete onClick={handleCloseModal} className="size-7" />
            </div>
            <div className="border-[1px] border-b-gray-400"></div>
            <div className="flex gap-x-5">
                Name:
                <input
                    type="text"
                    name="name"
                    value={subject.name}
                    onChange={(e) => handleChange(e)}
                    className="border-2 p-2" />
            </div>

            {errorMessage && (
                <div className="text-red-500 mt-2 text-sm">{errorMessage}</div>
            )}


            <div className="flex justify-end">
                <button onClick={saveSubject} className="bg-gradient-to-l from-[#4df1bb] to-[#1c8764] py-2 px-4 rounded-lg">Create</button>
            </div>
        </div>
    )
}