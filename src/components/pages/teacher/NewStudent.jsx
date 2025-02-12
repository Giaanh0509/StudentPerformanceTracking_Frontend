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
            <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg w-[750px] h-2/3">
                <div className="flex justify-between">
                    <div className="font-bold text-xl">Create new student</div>
                    <TiDelete onClick={handleCloseModal} className="size-7" />
                </div>
                <div className="border-[1px] border-b-gray-400"></div>
                <div className="flex justify-between gap-x-5">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={student.name}
                        onChange={(e) => handleChange(e)}
                        className="border-2 w-72 p-2 mr-72" />
                </div>

                <div className="flex justify-between gap-x-5">
                    Date of Birth:
                    <input
                        type="text"
                        name="dateOfBirth"
                        value={student.dateOfBirth}
                        onChange={(e) => handleChange(e)}
                        className="border-2 w-72 p-2 mr-72" />
                </div>

                <div className="flex justify-between gap-x-5">
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={student.email}
                        onChange={(e) => handleChange(e)}
                        className="border-2 w-72 p-2 mr-72" />
                </div>

                <div className="flex justify-end">
                    <button onClick={saveStudent} className="bg-gradient-to-l from-[#4df1bb] to-[#1c8764] py-2 px-4 rounded-lg">Create</button>
                </div>
            </div>
        </div>
    )
}