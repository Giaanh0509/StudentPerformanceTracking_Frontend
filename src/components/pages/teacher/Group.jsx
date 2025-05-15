import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useState, createContext, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { NewStudent } from "./NewStudent";
import axios from "axios";
import { Link, useSearchParams } from 'react-router-dom';
import { NewGroup } from "./NewGroup";
import { DeleteGroup } from "./DeleteGroup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const modalContext = createContext();
export const deleteGroupContext = createContext();

export const Group = () => {

    const [groups, setGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    }
    )

    const [subjectsPerPage] = useState(8);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;

    const [deletePopup, setDeletePopup] = useState(false);
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const [render, setRender] = useState(0);

    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            setShowModal(false);
        }
    };

    const handleDeleteButton = (groupId) => {
        setSelectedGroupId(groupId);
        setDeletePopup(true);
    }

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
            if (userInfo.id != 0) {
                setLoading(true);

                axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/groups/userId=${userInfo.id}`)
                    .then(response => {
                        {
                            const fetchedSubjects = response.data || [];
                            setGroups(response.data);
                        }
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });

                setLoading(false)
            }
        };

        fetchData();

    }, [userInfo, render])

    const indexOfLastSubject = currentPage * subjectsPerPage;
    const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
    const currentSubjects = groups.slice(indexOfFirstSubject, indexOfLastSubject);

    const paginate = (pageNumber) => {
        setSearchParams({ page: pageNumber });
    };

    return (
        <div className="flex flex-col h-[640px] bg-white mx-6 mt-4 p-3 rounded-lg shadow-lg shadow-slate-400">
            <div className="flex justify-between mb-3 text-sm">
                <div className="mt-3 ml-7 mr-auto">
                    <div className="flex p-[8px] border-[1px] rounded-lg w-auto border-[#7fa195]" name="" id="">
                        Number of groups: <p className="ml-2 font-bold">{groups.length}</p>
                    </div>
                </div>
                <div className="mt-3">-
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for groups" />
                </div>
                <div className="flex items-center gap-x-2 text-sm p-2 bg-gradient-to-t rounded-lg from-[#8dbaaa] to-[#14ce90] m-3 text-white">
                    <IoIosAddCircle className="size-5" />
                    <button onClick={handleButton} className="font-montserrat font-medium">
                        New Group
                    </button>
                </div>
            </div>

            <div className="px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 rounded-md bg-neutral-200 items-center">
                <div className="grid grid-cols-4 font-montserrat font-bold ">
                    <div className="col-span-1">
                        Name
                    </div>

                    <div className="">
                        Create Date
                    </div>

                    <div className="">
                        Number Of Students
                    </div>

                    <div>
                    </div>
                </div>
            </div>

            {!loading && (
                <div className="flex flex-col max-h-[450px] overflow-y-auto">
                    {currentSubjects.map((group) => (
                        <Link to={`/teacher/groups/${group.id}`}>
                            <div key={group.id} className="grid grid-cols-4 p-4 ml-7 gap-x-3 mr-3 items-center hover:bg-slate-100">
                                <div className="col-span-1 font-montserrat font-meidum">
                                    {group.name}
                                </div>

                                <div className="font-montserrat font-meidum">
                                    {group.createDate}
                                </div>

                                <div className="flex ml-16 font-montserrat font-meidum">
                                    {group.numberOfStudents}
                                </div>

                                <div className="flex gap-x-2 ml-16 font-monts1 px-2rrat font-meidum" onClick={(e) => {
                                    e.preventDefault();
                                }}>
                                    <button onClick={() => handleDeleteButton(group.id)} className="bg-[#a30303] p-2 rounded-lg text-white"><MdDelete /></button>
                                </div>

                            </div>
                            <div className="ml-7 gap-x-3 mr-3 border-[1px] border-b-gray-200"></div>
                        </Link>
                    ))}
                </div>
            )}

            <div className="flex justify-end items-center mt-3 mr-10 gap-x-2">
                <FaAngleDown className="rotate-90" />
                {Array.from({ length: Math.ceil(groups.length / subjectsPerPage) }, (_, index) => (
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

            {deletePopup && (
                <deleteGroupContext.Provider value={{ selectedGroupId, setDeletePopup, render, setRender }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 flex justify-center items-center z-50">
                        <DeleteGroup onSuccessDelete={() => toast.success("Group deleted successfully! 🎉")}></DeleteGroup>
                    </div>
                </deleteGroupContext.Provider>
            )}

            {showModal && (
                <modalContext.Provider value={{ showModal, setShowModal, groups, setGroups, render, setRender }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <NewGroup onSuccessCreate={() => toast.success("Group created successfully! 🎉")}></NewGroup>
                    </div>
                </modalContext.Provider>
            )}

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

        </div>
    )
}