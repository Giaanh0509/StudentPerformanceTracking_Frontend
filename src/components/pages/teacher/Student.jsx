import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useState, createContext, useEffect } from "react";
import { NewStudent } from "./NewStudent";
import axios from "axios";
import { useParams, useLocation } from 'react-router-dom';
import { Link, useSearchParams } from 'react-router-dom';
import { AiOutlineExclamationCircle } from "react-icons/ai";


export const modalContext = createContext();

export const Student = () => {
    const { id } = useParams();

    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const [group, setGroup] = useState({
        id: "",
        name: "",
        description: "",
        createDate: ""
    });


    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    }  
    );

    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            setShowModal(false);
        }
    };

    const handleButton = () => {
        setShowModal(true);
    };

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
            axios.get(`http://localhost:8080/groups`)
                .then(response => {
                    {   console.log(response);
                        response.data._embedded.groups.map(group => {
                            if (group.id == id) {
                                setGroup(group)
                            }
                        })
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        };

        fetchData();

    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if(userInfo.id != 0) {
                setLoading(true);

                axios.get(`http://localhost:8080/groupsStudents/groupId=${id}`)
                .then(response => {
                    {  
                       console.log(response.data);
                       const fetchedSubjects = response.data || [];
                       setStudents(response.data);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

                setLoading(false)
            }
        };

        fetchData();

    }, [userInfo])

    console.log(id);

    return (
        <div className="flex flex-col h-full bg-white m-8 p-3">
            <div className="flex">
                <div className="text-2xl px-8 py-4 font-montserrat font-semibold">
                    Groups / {group.name}
                </div>
            </div>

            <div className="flex justify-between mb-3">
                <div className="mt-3 ml-7 mr-auto">
                    <div className="flex p-[8px] border-[1px] rounded-lg w-48 border-[#7fa195]" name="" id="">
                        Number of students: <p className="ml-2 font-bold">5</p>
                    </div>
                </div>
                <div className="mt-3">
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for students" />
                </div>
                <div className="flex items-center gap-x-2 p-2 bg-gradient-to-t rounded-lg from-[#8dbaaa] to-[#14ce90] m-3 text-white">
                    <IoIosAddCircle className="size-5" />
                    <button onClick={handleButton} className="text-base font-montserrat font-medium">
                        Create New Student
                    </button>
                </div>
            </div>

            <div className="px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 rounded-md bg-neutral-200 items-center">
                <div className="grid grid-cols-4 font-montserrat font-bold ">
                    <div className="">
                        Name
                    </div>

                    <div>
                        Date Of Birth
                    </div>

                    <div>
                        Email
                    </div>

                    <div>
                        Account
                    </div>
                </div>
            </div>

            {!loading && (
                <div>
                    {students.map((student) => (
                        <Link>
                            <div key={student.id} className="grid grid-cols-4 p-4 ml-7 gap-x-3 mt-3 mr-3 items-center">
                                <div className="font-montserrat font-medium">
                                    {student.name}
                                </div>

                                <div className="font-montserrat font-medium">
                                    {student.dateOfBirth}
                                </div>

                                <div className="font-montserrat font-medium">
                                    {student.email}
                                </div>

                                <div className="ml-3 font-montserrat font-medium">
                                    <AiOutlineExclamationCircle className="size-5"/>
                                </div>
                            </div>

                            <div className="ml-7 gap-x-3 mr-3 border-[1px] border-b-gray-200"></div>
                        </Link>     
                    ))}
                </div>
            )}

            {showModal && (
                <modalContext.Provider value={{showModal, setShowModal, students, setStudents, id}}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <NewStudent></NewStudent>
                    </div>
                </modalContext.Provider>
            )}
        </div>
    )
}