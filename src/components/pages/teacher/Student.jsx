import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useState, createContext, useEffect } from "react";
import { NewStudent } from "./NewStudent";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useParams, useLocation } from 'react-router-dom';
import { Link, useSearchParams } from 'react-router-dom';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import * as XLSX from 'xlsx';
import { FaFileUpload } from "react-icons/fa";
export const modalContext = createContext();

export const Student = () => {
    const { id } = useParams();

    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const [file, setFile] = useState(null);
    const [studentsData, setStudentsData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);


    const [subjectsPerPage] = useState(5);

    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get('page')) || 1;

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
                    {
                        console.log(response);
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
            if (userInfo.id != 0) {
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

    const handleUpload = async () => {
        if (!file) {
            alert("Please select an Excel file to upload.");
            return;
        }

        const reader = new FileReader();

        reader.onload = async (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: "array" });

            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];

            const studentsData = XLSX.utils.sheet_to_json(worksheet);
            console.log("Students Data:", studentsData);
        };

        reader.readAsArrayBuffer(file);
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);

        if (selectedFile) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: "array" });

                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];

                const jsonData = XLSX.utils.sheet_to_json(worksheet);
                setStudentsData(jsonData);
                setShowPopup(true);
            };

            reader.readAsArrayBuffer(selectedFile);
        }
    };


    const indexOfLastSubject = currentPage * subjectsPerPage;
    const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
    const currentSubjects = students.slice(indexOfFirstSubject, indexOfLastSubject);

    const paginate = (pageNumber) => {
        setSearchParams({ page: pageNumber });
    };

    return (
        <div className="flex flex-col h-full bg-white m-8 p-3">
            <div className="flex">
                <div className="text-2xl px-8 py-4 font-montserrat font-semibold">
                    Manage Groups / {group.name}
                </div>
            </div>

            <div className="flex justify-between mb-3 text-sm">
                <div className="mt-3 ml-7 mr-auto">
                    <div className="flex p-[8px] border-[1px] rounded-lg w-44 border-[#7fa195]" name="" id="">
                        Number of students: <p className="ml-2 font-bold">{students.length}</p>
                    </div>
                </div>
                <div className="mt-3">
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for students" />
                </div>
                <div className="flex items-center gap-x-2 p-2 bg-gradient-to-t rounded-lg from-[#8dbaaa] to-[#14ce90] ml-3 my-3 text-white">
                    <IoIosAddCircle className="size-5" />
                    <button onClick={handleButton} className="font-montserrat font-medium">
                        Create New Student
                    </button>
                </div>

                <div className="flex items-center gap-x-2">
                    <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="hidden" id="fileUpload" />
                    <label htmlFor="fileUpload" className="p-2 bg-gradient-to-t rounded-lg from-[#f4a261] to-[#e76f51] m-3 text-white cursor-pointer flex items-center gap-x-2">
                        <FaFileUpload className="size-5" />
                        <span>Upload Excel</span>
                    </label>
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
                    {currentSubjects.map((student) => (
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
                                    <AiOutlineExclamationCircle className="size-5" />
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

            {showPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-bold mb-3">Confirm Upload</h2>

                        <p className="text-gray-600">File: <span className="font-semibold">{file?.name}</span></p>
                        <p className="text-gray-600">Total Students: <span className="font-semibold">{studentsData.length}</span></p>

                        <div className="mt-3 max-h-40 overflow-y-auto border p-2 rounded">
                            {studentsData.slice(0, 5).map((student, index) => (
                                <div key={index} className="p-1 border-b">
                                    <span className="font-semibold">{student.Name}</span> - {student.Email}
                                </div>
                            ))}
                            {studentsData.length > 5 && <p className="text-gray-500">...and more</p>}
                        </div>

                        <div className="flex justify-end mt-4">
                            <button onClick={() => setShowPopup(false)} className="px-4 py-2 bg-gray-400 text-white rounded-lg mr-2">Cancel</button>
                            <button onClick={handleUpload} className="px-4 py-2 bg-green-500 text-white rounded-lg">Submit</button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <modalContext.Provider value={{ showModal, setShowModal, students, setStudents, id }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <NewStudent></NewStudent>
                    </div>
                </modalContext.Provider>
            )}
        </div>
    )
}