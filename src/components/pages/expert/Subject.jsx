import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { NewSubject } from "./NewSubject";
import { useState, createContext, useEffect } from "react";
import { Link, useSearchParams } from 'react-router-dom';
import axios from "axios";

export const modalContext = createContext();

export const Subject = () => {
    const [showModal, setShowModal] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    });

    const [subjectsPerPage] = useState(7);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;

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
            if (userInfo.id !== 0) {
                setLoading(true);

                axios.get(`http://localhost:8080/subjects/userId=${userInfo.id}`)
                    .then(response => {
                        const fetchedSubjects = response.data || [];
                        console.log(fetchedSubjects);
                        setSubjects(response.data);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });

                setLoading(false);
            }
        };

        fetchData();
    }, [userInfo]);

    const indexOfLastSubject = currentPage * subjectsPerPage;
    const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
    const currentSubjects = subjects.slice(indexOfFirstSubject, indexOfLastSubject);

    const paginate = (pageNumber) => {
        setSearchParams({ page: pageNumber });
    };

    return (
        <div className="flex flex-col h-full bg-white rounded-xl m-8 p-1">
            <div className="flex">
                <div className="text-2xl px-8 text-[#046b49] py-4 font-montserrat font-semibold">
                    Manage Subject
                </div>
            </div>
            <div className="flex justify-between mb-3 text-sm">
                <div className=" ml-7 mr-auto">
                    <div className="p-[8px] border-[1px] rounded-lg w-44 border-[#7fa195]" name="" id="">
                        Number of subjects: <span className="font-bold">{subjects.length}</span>
                    </div>
                </div>
                <div className="">
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for subjects" />
                </div>
                <div className="flex items-center text-sm gap-x-2 p-2 bg-gradient-to-t rounded-lg from-[#8dbaaa] to-[#14ce90] mx-3 text-white">
                    <IoIosAddCircle className="size-5" />
                    <button onClick={handleButton} className="text-sm font-montserrat font-medium">
                        Create New Subject
                    </button>
                </div>
            </div>

            <div className="px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 rounded-md bg-neutral-200 items-center">
                <div className="flex justify-between font-montserrat font-bold ">
                    <div>
                        Name
                    </div>
                    <div className="mr-[700px]">
                        Create Date
                    </div>
                </div>
            </div>

            {!loading && (
                <div>
                    {currentSubjects.map((subject) => (
                        <Link to={`/expert/subjects/${subject.id}`} key={subject.id}>
                            <div className="flex justify-between px-4 py-4 ml-7 gap-x-3 mr-3 items-center hover:bg-slate-100">
                                <div className="flex-1 font-montserrat font-medium">
                                    {subject.name}
                                </div>
                                <div className="font-montserrat font-medium mr-[677px]">
                                    {subject.createDate}
                                </div>
                                <FaAngleDown className="-rotate-90" />
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
                <modalContext.Provider value={{ showModal, setShowModal, subjects, setSubjects }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <NewSubject></NewSubject>
                    </div>
                </modalContext.Provider>
            )}
        </div>
    );
};
