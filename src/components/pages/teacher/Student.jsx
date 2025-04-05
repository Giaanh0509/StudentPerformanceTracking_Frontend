import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useState, createContext, useEffect, useRef } from "react";
import { NewStudent } from "./NewStudent";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { useParams, useLocation } from 'react-router-dom';
import { Link, useSearchParams } from 'react-router-dom';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import * as XLSX from 'xlsx';
import { FaFileUpload } from "react-icons/fa";
import { EditGroup } from "./EditGroup";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { CiBoxList } from "react-icons/ci";
import { HandleStudent } from "./HandleStudent";


export const modalContext = createContext();
export const editGroupContext = createContext();


export const Student = () => {
    const { id } = useParams();
    const fileInputRef = useRef(null);

    const [students, setStudents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    const [file, setFile] = useState(null);
    const [studentsData, setStudentsData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const [editPopup, setEditPopup] = useState(false);

    const [subjectsPerPage] = useState(7);

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
            setEditPopup(false);
        }
    };

    const handleButton = () => {
        setShowModal(true);
    };

    const handleEditButton = () => {
        setEditPopup(true);
    }

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
        if (studentsData.length === 0) {
            alert("No student data to upload.");
            return;
        }

        const updatedStudentsData = studentsData.map(student => ({
            ...student,
            groupId: id,
            userId: userInfo.id
        }));

        try {
            const response = await axios.post("http://localhost:8080/students/newList", updatedStudentsData);

            if (response.status === 200) {
                alert("Students uploaded successfully!");
                setStudents(prevStudents => [...prevStudents, ...updatedStudentsData]);

                setShowPopup(false);
            }
        } catch (error) {
            console.error("Error uploading students:", error);
            alert("Failed to upload students.");
        }
    };


    const handleCancel = () => {
        setShowPopup(false);
        setFile(null);
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

                let jsonData = XLSX.utils.sheet_to_json(worksheet, { raw: false });

                jsonData = jsonData.map(student => {
                    let parsedDateOfBirth = student.dateOfBirth;

                    if (!isNaN(parsedDateOfBirth)) {

                        const excelDate = XLSX.SSF.parse_date_code(parsedDateOfBirth);
                        parsedDateOfBirth = `${excelDate.y}-${String(excelDate.m).padStart(2, '0')}-${String(excelDate.d).padStart(2, '0')}`;
                    } else {

                        const dateParts = parsedDateOfBirth.split("/");
                        if (dateParts.length === 3 && dateParts[2].length === 2) {
                            let year = parseInt(dateParts[2], 10);
                            if (year >= 50) {
                                year = 1900 + year;
                            } else {
                                year = 2000 + year;
                            }
                            dateParts[2] = year.toString();
                            parsedDateOfBirth = dateParts.join("/");
                        }
                    }

                    return {
                        ...student,
                        dateOfBirth: parsedDateOfBirth
                    };
                });

                setStudentsData(jsonData);
                setShowPopup(true);

                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
            };

            reader.readAsArrayBuffer(selectedFile);
        }
    };

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/teacher/groups');
    };


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
                    Manage Groups / {group.name}
                </div>

                
            </div>

            <div className='flex justify-between ml-8 mr-3'>
                <div className='w-1/2 h-auto bg-neutral-200 my-5 py-3 px-4 gap-y-5 rounded-xl'>
                    <div className='text-lg flex items-center gap-x-4 font-montserrat font-bold mb-3'>Infomation
                        <button onClick={handleEditButton}> <CiEdit></CiEdit> </button>
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
                <div className="mt-3">
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for students" />
                </div>

                <div className="flex items-center mr-3 gap-x-2 p-2 bg-gradient-to-t rounded-lg from-[#8dbaaa] to-[#14ce90] ml-3 my-3 text-white">
                    <CiBoxList size={17}/>
                    <button onClick={handleButton} className="font-montserrat font-medium">
                        Request
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
                    {currentSubjects.map((student) => (
                        <Link className="flex flex-col">
                            <div key={student.id} className="grid grid-cols-4 p-4 ml-7 gap-x-3 mr-3 items-center hover:bg-slate-100">
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
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
                        <h2 className="text-lg font-bold mb-3">Confirm Upload</h2>

                        <p className="text-gray-600">File: <span className="font-semibold">{file?.name}</span></p>
                        <p className="text-gray-600">Total Students: <span className="font-semibold">{studentsData.length}</span></p>

                        <div className="mt-3 max-h-60 overflow-y-auto border p-2 rounded">
                            {studentsData.slice(0, studentsData.length).map((student, index) => (
                                <div key={index} className="p-1 border-b">
                                    <span className="font-semibold">{student.name}</span> - <span>{student.email}</span> - <span>{student.dateOfBirth}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end mt-4">
                            <button onClick={handleCancel} className="px-4 py-2 bg-red-600 text-white rounded-lg mr-2">Cancel</button>
                            <button onClick={handleUpload} className="px-4 py-2 bg-green-500 text-white rounded-lg">Submit</button>
                        </div>
                    </div>
                </div>
            )}

            {showModal && (
                <modalContext.Provider value={{ showModal, setShowModal, students, setStudents, id }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <HandleStudent></HandleStudent>
                    </div>
                </modalContext.Provider>
            )}

            {editPopup && (
                <editGroupContext.Provider value={{ group, setGroup, editPopup, setEditPopup }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <EditGroup></EditGroup>
                    </div>
                </editGroupContext.Provider>
            )}
        </div>
    )
}