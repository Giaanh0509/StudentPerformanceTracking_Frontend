import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { FaAngleDown } from "react-icons/fa6";
import { Link, useSearchParams } from 'react-router-dom';
import { MdDelete } from "react-icons/md";


export const achievementStudent = createContext();

export const AchievementStudent = () => {

    const [objectives, setObjectives] = useState([]);
    const [student, setStudent] = useState({});

    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    }
    );

    useEffect(() => {
        const storedUserLoginDTO = localStorage.getItem('userLoginDTO');

        if (storedUserLoginDTO) {
            try {
                const userLoginDTO = JSON.parse(storedUserLoginDTO);

                setUserInfo(userLoginDTO);
            } catch (e) {
                console.error('Error parsing userLoginDTO from localStorage:', e);
            }
        } else {
            console.log('No user info found in localStorage');
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (userInfo.id != 0) {
                axios.get(`http://localhost:8080/students/userId=${userInfo.id}`)
                    .then(response => {
                        {
                            console.log(response.data);
                            setStudent(response.data);
                        }
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
            }
        };
        fetchData();
    }, [userInfo])


    useEffect(() => {
        {
            axios.get(`http://localhost:8080/objectives/studentId=${student.id}`)
                .then(response => setObjectives(response.data || []))
                .catch(error => console.error("Error fetching objectives:", error));
        }

    }, [student]);

    return (
        <div className="flex flex-col h-[640px] bg-white mx-6 mt-4 p-3 rounded-lg shadow-lg shadow-slate-400">

            <div className="px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 rounded-md bg-neutral-200 items-center">
                <div className="grid grid-cols-5 font-montserrat font-bold ">
                    <div className="">
                        Subject
                    </div>

                    <div className="">
                        Objective
                    </div>

                    <div className="">
                        Group
                    </div>

                    <div>
                        Teacher
                    </div>

                    <div>
                        Final score
                    </div>
                </div>
            </div>

            <div className="flex flex-col max-h-[450px] overflow-y-auto">
                {objectives.map((objective) => (
                        <Link className="" to={`/learner/achievement/${objective.id}`}>
                            <div className="grid grid-cols-5 p-4 ml-7 gap-x-3 mr-3 items-center h-24 hover:bg-slate-100">
                                <div className="col-span-1 font-montserrat font-meidum">
                                    {objective.subject}
                                </div>

                                <div className="font-montserrat font-meidum">
                                    {objective.name}
                                </div>

                                <div className="flex font-montserrat font-meidum">
                                    {objective.group}
                                </div>

                                <div>
                                    {objective.userName}
                                </div>

                                <div className="flex ml-4 font-montserrat font-meidum">
                                    /10
                                </div>
                            </div>
                            <div className="ml-7 gap-x-3 mr-3 border-[1px] border-b-gray-200"></div>
                        </Link>
                ))}
            </div>
        </div>
    )
}