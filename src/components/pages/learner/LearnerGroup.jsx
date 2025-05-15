import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { FaAngleDown } from "react-icons/fa6";
import { Link, useSearchParams } from 'react-router-dom';
import { MdDelete } from "react-icons/md";


export const LearnerGroup = () => {

    const [groups, setGroups] = useState([]);

    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    }
    );

    const [student, setStudent] = useState({});

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
                axios.get(`studentperformancetrackingbackend-production.up.railway.app/students/userId=${userInfo.id}`)
                    .then(response => {
                        {
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
        const fetchData = async () => {

            axios.get(`studentperformancetrackingbackend-production.up.railway.app/groups/all`)
                .then(response => {
                    {
                        const fetchedSubjects = response.data || [];
                        setGroups(response.data);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

        };

        fetchData();

    }, [])

    useEffect(() => {
        const fetchGroupStatus = async () => {
            if (student.id != 0) {
                const updatedGroups = [...groups];

                for (let group of updatedGroups) {
                    try {
                        const response = await axios.get(`studentperformancetrackingbackend-production.up.railway.app/groupsStudents/studentId=${student.id}/groupId=${group.id}`);
                        group.status = response.data;
                    } catch (error) {
                        console.error('Error fetching group status:', error);
                        group.status = 'UNKNOWN';
                    }
                }

                setGroups(updatedGroups);
            }
        };

        fetchGroupStatus();
    }, [student.id]);

    const handleJoin = async (groupId) => {
        const updatedGroups = groups.map(group => {
            if (group.id === groupId && group.status === "") {
                group.status = 'PENDING'; 
                axios.post(`studentperformancetrackingbackend-production.up.railway.app/groupsStudents/updateStatus`, {
                    studentId: student.id,
                    groupId: group.id,
                    status: 'PENDING'
                })
                .then(response => {
                    console.log("Status updated successfully:", response.data);
                })
                .catch(error => {
                    console.error("Error updating status:", error);
                });
            }
            return group;
        });
        setGroups(updatedGroups); 
    };

    console.log(student.id)
    console.log(groups)

    const [subjectsPerPage] = useState(8);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;

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
            </div>

            <div className="px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 rounded-md bg-neutral-200 items-center">
                <div className="grid grid-cols-5 font-montserrat font-bold ">
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
                        Teacher
                    </div>

                    <div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col max-h-[450px] overflow-y-auto">
                {currentSubjects.map((group) => (
                    <Link className="" to={`/learner/groups/${group.id}`}>
                        <div key={group.id} className="grid grid-cols-5 p-4 ml-7 gap-x-3 mr-3 items-center hover:bg-slate-100">
                            <div className="col-span-1 font-montserrat font-meidum">
                                {group.name}
                            </div>

                            <div className="font-montserrat font-meidum">
                                {group.createDate}
                            </div>

                            <div className="flex ml-16 font-montserrat font-meidum">
                                5
                            </div>

                            <div>
                                {group.userName}
                            </div>

                            <div onClick={(e) => {
                                            e.preventDefault();
                                    }} className="flex gap-x-2 ml-16 font-monts1 px-2rrat font-medium">
                                <button
                                    className={`p-2 rounded-lg text-white 
                                    ${group.status === "" ? 'bg-[#007bff]' :
                                            group.status === "APPROVED" ? 'bg-green-500' :
                                                group.status === "PENDING" ? 'bg-yellow-500' :
                                                    group.status === "REJECTED" ? 'bg-red-500' : 'bg-[#007bff]'}`}
                                    onClick={() =>  handleJoin(group.id)}
                                    disabled={group.status !== ""}  // Disable the button if already joined or has other status
                                >
                                    {group.status === "" ? "Join" :
                                        group.status === "APPROVED" ? "Joined" :
                                            group.status === "PENDING" ? "Waiting" :
                                                group.status === "REJECTED" ? "Rejected" : group.status}
                                </button>
                            </div>

                        </div>
                        <div className="ml-7 gap-x-3 mr-3 border-[1px] border-b-gray-200"></div>
                    </Link>
                ))}
            </div>

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
        </div>
    )
}