import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { useParams, useLocation } from 'react-router-dom';
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { Group } from "../teacher/Group";
import { CiEdit } from "react-icons/ci";
import { Link, useSearchParams } from 'react-router-dom';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaAngleDown } from "react-icons/fa6";


export const LearnerStudent = () => {

    const { id } = useParams();

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/learner/groups');
    };

    const [group, setGroup] = useState({
        id: "",
        name: "",
        description: "",
        createDate: ""
    });

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`https://student-be-production.up.railway.app/groups/groupId=${id}`)
                .then(response => {
                    {
                        console.log(response.data);
                        setGroup(response.data);
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
            setLoading(true);

            axios.get(`https://student-be-production.up.railway.app/groupsStudents/groupId=${id}`)
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

        };

        fetchData();

    }, [])

    const [subjectsPerPage] = useState(7);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;

    const indexOfLastSubject = currentPage * subjectsPerPage;
    const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
    const currentSubjects = students.slice(indexOfFirstSubject, indexOfLastSubject);

    const paginate = (pageNumber) => {
        setSearchParams({ page: pageNumber });
    };

    return (
        <div className="flex flex-col h-[640px] bg-white mx-6 mt-4 p-3 rounded-lg shadow-lg shadow-slate-400 overflow-y-auto">

            <div className="flex items-center">
                <button
                    onClick={handleGoBack}
                    className="flex items-center text-[#046b49] hover:text-[#034d36]"
                >
                    <AiOutlineArrowLeft className="text-2xl" />
                </button>
                <div className="text-xl px-3 py-2 font-montserrat font-semibold text-[#046b49]">
                    {group.name}
                </div>
            </div>

            <div className='flex justify-between ml-8 mr-3'>
                <div className='w-1/2 h-auto bg-neutral-200 my-5 py-3 px-4 gap-y-5 rounded-xl'>
                    <div className='text-lg flex items-center gap-x-4 font-montserrat font-bold mb-3'>Infomation
                    </div>

                    <div className='flex font-medium justify-between mr-[70px] mb-3'>
                        <div className='flex gap-x-16'>Name:<div className='text-[#348a6c]'>
                            {group.name}
                        </div>
                        </div>

                        <div className='flex gap-x-3'>Create Date:<div className='text-[#348a6c]'>
                            {group.createDate}
                        </div>
                        </div>
                    </div>

                    <div className='flex font-medium justify-between mr-[75px] mb-3'>
                        <div className='flex gap-x-6'>Description:<div className='text-[#348a6c]'>
                            {group.description}
                        </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="flex justify-between mb-3 text-sm">
                <div className="mt-3 ml-7 mr-auto">
                    <div className="flex p-[8px] border-[1px] rounded-lg w-44 border-[#7fa195]" name="" id="">
                        Number of students: <p className="ml-2 font-bold">{students.length}</p>
                    </div>
                </div>
            </div>

            <div className="px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 rounded-md bg-neutral-200 items-center">
                <div className="grid grid-cols-3 font-montserrat font-bold ">
                    <div className="">
                        Name
                    </div>

                    <div>
                        Date Of Birth
                    </div>

                    <div>
                        Email
                    </div>
                </div>
            </div>

            {!loading && (
                <div>
                    {currentSubjects.map((student) => (
                        <Link className="flex flex-col">
                            <div key={student.id} className="grid grid-cols-3 p-4 ml-7 gap-x-3 mr-3 items-center hover:bg-slate-100">
                                <div className="font-montserrat font-medium">
                                    {student.name}
                                </div>

                                <div className="font-montserrat font-medium">
                                    {student.dateOfBirth}
                                </div>

                                <div className="font-montserrat font-medium">
                                    {student.email}
                                </div>
                            </div>

                            <div className="ml-7 gap-x-3 mr-3 border-[1px] border-b-gray-200"></div>
                        </Link>
                    ))}
                </div>
            )}

            <div className="flex justify-end items-center mt-3 mr-10 gap-x-2">
                <FaAngleDown className="rotate-90" />
                {Array.from({ length: Math.ceil(students.length / subjectsPerPage) }, (_, index) => (
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