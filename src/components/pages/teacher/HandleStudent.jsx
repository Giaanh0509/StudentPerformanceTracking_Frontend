import { modalContext } from "./Student";
import { useState, useContext, useEffect } from "react";
import StudentService from "../../../services/StudentService";
import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

export const HandleStudent = () => {

    const { showModal, setShowModal } = useContext(modalContext);
    const { students, setStudents } = useContext(modalContext);
    const { id } = useContext(modalContext);

    const [studentRequests, setStudentRequests] = useState([]);

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`http://localhost:8080/groupsStudents/joinRequest/groupId=${id}`)
                .then(response => {
                    {
                        const fetchedSubjects = response.data || [];
                        setStudentRequests(response.data);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        };

        fetchData();

    }, [])

    const handleAccept = async (studentId, groupId) => {
        try {
            await axios.get(`http://localhost:8080/groupsStudents/acceptRequest/studentId=${studentId}/groupId=${groupId}`);
            
        } catch (error) {
            console.error("Error updating subject:", error);
        }
    };

    return (
        <div className="flex flex-col gap-y-4 bg-white font-montserrat p-4 rounded-lg w-[1000px] h-auto h-max-2/3">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl text-[#03966c]">Group join requests</h2>
                <button onClick={handleCloseModal} className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete className="size-7" />
                </button>
            </div>

            <div className="border-[1px] border-b-gray-400"></div>

            <div className="mt-3">
                <div className="max-h-60 overflow-y-auto border p-2 bg-neutral-300  border-gray-300">
                    <div className="p-1">
                        <div className="grid grid-cols-4 ml-3">
                            <div>Email</div>
                            <div className="ml-20">Name</div>
                            <div className="ml-20">Date of birth</div>
                            <div className="ml-20"></div>
                        </div>
                    </div>
                </div>

                <div className="max-h-60 overflow-y-auto border-x border-b p-2 border-gray-300 rounded">
                    <div className="flex flex-col p-1 gap-y-3">
                        {studentRequests.map((student, index) => (
                            <div className="grid grid-cols-4 ml-3 mt-1" key={student.id}>
                                <div className="mt-1">{student.email}</div>
                                <div className="mt-1 ml-20">{student.name}</div>
                                <div className="mt-1 ml-20">{student.dateOfBirth}</div>
                                <div className="flex gap-x-10 ml-16">
                                    <AiOutlineCheck color="green" size={25} />
                                    <AiOutlineClose color="red" size={25}/>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}