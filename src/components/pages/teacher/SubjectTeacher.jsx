import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useState, createContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import SubjectService from "../../../services/SubjectService";
import axios from "axios";


export const modalContext = createContext();

export const SubjectTeacher = () => {

    const [showModal, setShowModal] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    }  
    );


    const handleButton = () => {
        setShowModal(true);
    };

    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            setShowModal(false);
        }
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
            if(userInfo.id != 0) {
                setLoading(true);

                axios.get(`http://localhost:8080/subjects/all`)
                .then(response => {
                    {  
                       const fetchedSubjects = response.data || [];
                       console.log(fetchedSubjects);
                       setSubjects(response.data);
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

    return (
        <div className="flex flex-col h-full bg-white rounded-xl m-8 p-3">
            <div className="flex">
                <div className="text-2xl px-8 py-4 font-montserrat font-semibold">
                    Subjects
                </div>
            </div>
            <div className="flex justify-between mb-3">
                <div className="mt-3 ml-7 mr-auto">
                    <select className="p-[8px] border-[1px] rounded-lg w-44 border-[#7fa195]" name="" id="">
                        <option value="all">Slect all subjects</option>
                        <option value="myself">Select my subjects</option>
                    </select>
                </div>
                <div className="mt-3">
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for subjects" />
                </div>
            
            </div>

            {!loading && (
                <div>
                    {subjects.map((subject) => (
                        <Link to={`/teacher/subjects/${subject.id}`}>
                            <div key={subject.id} className="flex p-4 ml-7 gap-x-3 mt-3 mr-3 bg-neutral-200 items-center">
                                <FaAngleDown className="-rotate-90" />
                                <div className="font-montserrat font-semibold">
                                    {subject.name}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {showModal && (
                <modalContext.Provider value={{ showModal, setShowModal, subjects, setSubjects }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    </div>
                </modalContext.Provider>
            )}

        </div>
    )
}