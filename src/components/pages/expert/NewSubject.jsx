import { TiDelete } from "react-icons/ti";
import { useState, useContext, useEffect } from "react";
import { modalContext } from "./Subject";
import SubjectService from "../../../services/SubjectService";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const NewSubject = ({ onSuccessCreate }) => {
    const { showModal, setShowModal } = useContext(modalContext);
    const { subjects, setSubjects } = useContext(modalContext);
    const { render, setRender } = useContext(modalContext);

    const [subject, setSubject] = useState({
        id: "",
        name: "",
        description: "",
        createDate: "",
        userId: ""
    });

    const [errors, setErrors] = useState({ name: false, description: false });

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubject({ ...subject, [name]: value });

        setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
    };

    useEffect(() => {
        const userLoginDTO = localStorage.getItem("userLoginDTO");
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

        let newErrors = {
            name: !subject.name,
            description: !subject.description
        };
        setErrors(newErrors);

        if (newErrors.name || newErrors.description) return;

        const currentDate = new Date().toISOString().split("T")[0];
        const newSubject = { ...subject, createDate: currentDate };

        SubjectService.saveSubject(newSubject)
            .then((response) => {
                setSubjects((prevSubjects) => [...prevSubjects, response.data]);
                setShowModal(false);
                setRender(render+1);
                onSuccessCreate && onSuccessCreate();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className="flex flex-col gap-y-4 bg-white font-montserrat p-6 rounded-2xl w-[500px] shadow-lg">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl text-[#03966c]">Create New Subject</h2>
                <button onClick={handleCloseModal} className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete className="size-7" />
                </button>
            </div>
            <div className="border-b border-gray-300"></div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={subject.name}
                    onChange={handleChange}
                    placeholder="Enter subject name"
                    className={`border-2 p-2 w-full rounded-lg ${errors.name ? "border-red-500 focus:ring-red-500" : ""
                        }`}
                />
                {errors.name && <p className="text-red-500 text-sm">Subject name is required.</p>}
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold">Description:</label>
                <textarea
                    name="description"
                    value={subject.description}
                    onChange={handleChange}
                    placeholder="Enter subject description"
                    className={`border-2 p-2 w-full rounded-lg resize-none ${errors.description ? "border-red-500 focus:ring-red-500" : ""
                        }`}
                    rows="3"
                ></textarea>
                {errors.description && <p className="text-red-500 text-sm">Description is required.</p>}
            </div>

            <div className="flex justify-center bg-gradient-to-l from-[#3ccb9b] to-[#1c8764] mt-1 rounded-lg">
                <button
                    onClick={saveSubject}
                    className=" py-2 px-6 rounded-lg text-white hover:opacity-90 transition"
                >
                    Create
                </button>
            </div>
        </div>
    );
};
