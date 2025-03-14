import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useState, createContext, useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import SubjectService from "../../../services/SubjectService";
import axios from "axios";
import { SubjectImpl } from "./SubjectImpl";

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

    const [subjectsPerPage] = useState(8);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;


    const handleButton = () => {
        setShowModal(true);
    };

    const [selectedSubjectId, setSelectedSubjectId] = useState(null);

    const handleSelectedSubjectId = (subjectId) => {
        setSelectedSubjectId(subjectId);
    }


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
            if (userInfo.id != 0) {
                setLoading(true);

                axios.get(`http://localhost:8080/subjects/all`)
                    .then(response => {
                        {
                            const fetchedSubjects = response.data || [];
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

    const indexOfLastSubject = currentPage * subjectsPerPage;
    const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
    const currentSubjects = subjects.slice(indexOfFirstSubject, indexOfLastSubject);

    const paginate = (pageNumber) => {
        setSearchParams({ page: pageNumber });
    };

    return (
        <div className="flex flex-col h-[640px] bg-white rounded-xl mx-6 mt-4 p-3 shadow-lg shadow-slate-400">
            <div className="flex">
                <div className="text-2xl px-8 py-4 font-montserrat font-semibold">
                    Subjects
                </div>
            </div>
            <div className="flex justify-between mb-3">
                <div className="mt-3 ml-7 mr-auto border-1 border-black">
                    <div className="flex p-[8px] border-[1px] rounded-lg w-50 border-[#7fa195]" name="" id="">
                        Number of subjects: <p className="ml-2 font-bold">{subjects.length}</p>
                    </div>
                </div>
                <div className="mt-3">
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for subjects" />
                </div>

            </div>

            <div className="px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 rounded-md bg-neutral-200 items-center">
                <div className="grid grid-cols-4 font-montserrat font-bold ">
                    <div className="col-span-1">
                        Name
                    </div>

                    <div>
                        Create Date
                    </div>

                    <div>
                        Owner
                    </div>
                </div>
            </div>

            {!loading && (
                <div className="flex flex-col max-h-[400px] overflow-y-auto">
                    {currentSubjects.map((subject) => (
                        <Link to={`/teacher/subjects/${subject.id}`}>
                            <div key={subject.id} className="grid grid-cols-4 p-4 ml-7 gap-x-3 mr-3 items-center hover:bg-slate-100">
                                <div className="col-span-1 font-montserrat font-meidum">
                                    {subject.name}
                                </div>
                                <div className="font-montserrat font-medium">
                                    {subject.createDate}
                                </div>

                                <div className="font-montserrat font-medium">{subject.userName}</div>

                                <div className="flex justify-between items-center"
                                    onClick={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <button onClick={() => {
                                        handleButton();
                                        handleSelectedSubjectId(subject.id);
                                    }} className="bg-[#049f6b] py-1 px-3 rounded-md text-white">Implement</button>
                                </div>
                            </div>
                            <div className="ml-7 gap-x-3 mr-3 border-[1px] border-b-gray-200"></div>
                        </Link>
                    ))}
                </div>
            )}

            <div className="flex justify-end items-center mt-3 mr-10 gap-x-2">
                <FaAngleDown className="rotate-90" />
                {Array.from({ length: Math.ceil(subjects.length / subjectsPerPage) }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => paginate(index + 1)}
                        className={`px-2 py-1 rounded-full ${currentPage === index + 1 ? 'bg-[#049f6b] text-white' : 'bg-gray-200 text-black'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <FaAngleDown className="-rotate-90" />
            </div>

            {showModal && (
                <modalContext.Provider value={{ showModal, setShowModal, subjects, setSubjects, selectedSubjectId }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <SubjectImpl></SubjectImpl>
                    </div>
                </modalContext.Provider>
            )}

        </div>
    )
}