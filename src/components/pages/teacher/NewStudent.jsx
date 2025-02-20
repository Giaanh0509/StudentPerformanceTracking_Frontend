import { useState, useContext, useEffect } from "react";
import StudentService from "../../../services/StudentService";
import { TiDelete } from "react-icons/ti";
import { modalContext } from "./Student";

export const NewStudent = () => {

    const { showModal, setShowModal } = useContext(modalContext);
    const { students, setStudents } = useContext(modalContext);
    const { id } = useContext(modalContext);


    const [student, setStudent] = useState({
        id: "",
        name: "",
        dateOfBirth: "",
        email: "",
        userId: "",
        groupId: ""
    });

    useEffect(() => {
        if (id) {
            setStudent(prev => ({
                ...prev,
                groupId: id
            }));
        }
    }, [id]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setStudent({ ...student, [e.target.name]: value });
    }

    useEffect(() => {
        const userLoginDTO = localStorage.getItem('userLoginDTO');
        if (userLoginDTO) {
            try {
                const user = JSON.parse(userLoginDTO);
                setStudent((prevStudent) => ({
                    ...prevStudent,
                    userId: user.id
                }));
            } catch (error) {
                console.error("Error parsing userLoginDTO from localStorage:", error);
            }
        }
    }, []);

    const saveStudent = (e) => {
        e.preventDefault();
    
        StudentService.saveStudent(student)
            .then((response) => {
                setStudents((prevStudents) => [...prevStudents, response.data]);  
                setShowModal(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div>
            <div className="flex flex-col gap-y-4 bg-white font-montserrat p-4 rounded-lg w-[500px] h-2/3">
            <div className="flex justify-between">
                    <h2 className="font-bold text-2xl text-[#03966c]">Create New Student</h2>
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
                        value={student.name}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter subject name"
                        className={`border-2 p-2 w-full rounded-lg`} />
                </div>

                <div className="flex flex-col gap-1">
                    <span className="font-semibold">Email:</span>
                    <input
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter subject email"
                        className={`border-2 p-2 w-full rounded-lg`} />
                </div>

                <div className="flex flex-col gap-1">
                    <span className="font-semibold">Date of birth:</span>
                    <input
                        type="text"
                        name="dateOfBirth"
                        value={student.dateOfBirth}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter subject dateOfBirth"
                        className={`border-2 p-2 w-full rounded-lg`} />
                </div>

                <div className="flex justify-center bg-gradient-to-l from-[#4df1bb] to-[#1c8764] rounded-lg text-white">
                    <button onClick={saveStudent} className=" py-2 px-4 rounded-lg">Create</button>
                </div>
            </div>
        </div>
    )
}