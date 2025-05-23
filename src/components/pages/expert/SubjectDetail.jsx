import { useParams, useLocation } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import { useEffect, useState, createContext, useRef } from "react";
import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";
import { NewSkill } from './NewSkill';
import { CiEdit } from "react-icons/ci";
import { Indicator } from './Indicator';
import { selectedSkillContext } from "./selectedSkillContext";
import { EditSubject } from './EditSubject';
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { EditSkill } from './EditSkill';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteSkill } from './DeleteSkill';

export const skillContext = createContext();
export const indicatorContext = createContext();
export const editSubjectContext = createContext();
export const editSkillContext = createContext();
export const deleteSkillContext = createContext();

export const SubjectDetail = () => {

    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const subjectId = id;
    const [subject, setSubject] = useState({
        id: "",
        name: "",
        createDate: "",
        description: ""
    });

    const [render, setRender] = useState(0);

    const [showModal, setShowModal] = useState(false);
    const [popup, setPopup] = useState(false);

    const [editPopup, setEditPopup] = useState(false);
    const [editSkillPopup, setEditSkillPopup] = useState(false);
    const [deleteSkillPopup, setDeleteSkillPopup] = useState(false);
    const [selectedEditSkillId, setEditSelectedSkillId] = useState(null);

    const [check, setCheck] = useState(false);

    const [selectedSkillId, setSelectedSkillId] = useState(null);

    const handleButton = () => {
        setShowModal(true);
    };

    const handleEditButton = () => {
        setEditPopup(true);
    }

    const handleSkillClick = (skillId) => {
        setSelectedSkillId(skillId);
        setPopup(true);
    };

    const handleEditSkillClick = (skillId) => {
        setEditSelectedSkillId(skillId);
    }

    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            setShowModal(false);
            setPopup(false);
            setEditPopup(false);
            setEditSkillPopup(false);
            setDeleteSkillPopup(false);
        }
    };

    const handleDeleteButton = (skillId) => {
        setSelectedSkillId(skillId);
        setDeleteSkillPopup(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/subjects`)
                .then(response => {
                    {
                        response.data._embedded.subjects.map(subject => {
                            if (subject.id == subjectId) {
                                setSubject(subject)
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

    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleEditSkillPopup = () => {
        setEditSkillPopup(true);
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setCheck(false);

            try {
                const response = await axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/skills/subjectId=${subjectId}`);
                setSkills(response.data);
            } catch (error) {
                console.log(error);
            }

            setLoading(false)
        };

        fetchData();

    }, [check, render])

    const listRef = useRef(null);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [skills]);

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/expert/subjects');
    };

    return (
        <div className='flex flex-col h-[640px] bg-white rounded-xl mx-6 mt-4 p-3 shadow-lg shadow-slate-400'>
            <div className="flex items-center">
                <button
                    onClick={handleGoBack}
                    className="flex items-center text-[#046b49] hover:text-[#034d36]"
                >
                    <AiOutlineArrowLeft className="text-2xl" />
                </button>
                <div className="text-2xl text-[#046b49] pr-8 pl-2 py-4 font-montserrat font-semibold">
                    Manage Subject / {subject.name}
                </div>
            </div>

            <div className='flex justify-between ml-8 mr-3'>
                <div className='w-80 h-44 bg-neutral-200 my-5 rounded-xl'>
                    <div className='flex flex-col my-3 gap-y-3'>
                        <div className='flex justify-center text-lg font-bold mb-5'>
                            Number of uses
                        </div>
                        <div className='text-5xl flex justify-center'>
                            {subject.uses}
                        </div>
                    </div>
                </div>

                <div className='w-3/5 h-44 bg-neutral-200  my-5 py-3 px-4 gap-y-5 rounded-xl'>
                    <div className='text-lg flex items-center gap-x-4 font-montserrat font-bold mb-3'>Infomation
                        <button onClick={handleEditButton}> <CiEdit></CiEdit> </button>
                    </div>
                    <div className='flex font-medium justify-between mr-[75px] mb-3 text-base'>
                        <div className='flex gap-x-12'>Name:<div className='text-[#348a6c]'>
                            {subject.name}
                        </div></div>
                        <div className='flex gap-x-2'>Create date:
                            <div className='text-[#348a6c]'>{subject.createDate}</div></div>
                    </div>

                    <div className="flex font-medium mr-16 gap-x-2  text-base">
                        <span className="text-black">Description:</span>
                        <span className="text-[#348a6c]"> {subject.description} </span>
                    </div>
                </div>
            </div>


            <div className="flex justify-between mb-3 ml-8 text-sm">
                <div className="mt-3">
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for skill" />
                </div>
                <div className="flex items-center gap-x-2 p-2 bg-gradient-to-t rounded-lg from-[#508572] to-[#14ce90] m-3 text-white">
                    <IoIosAddCircle className="size-5" />
                    <button onClick={handleButton} className="text-sm font-montserrat font-medium">
                        Create New Skill
                    </button>
                </div>
            </div>

            <div className="px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 rounded-md bg-neutral-200 items-center">
                <div className="grid grid-cols-4 font-montserrat font-bold ">
                    <div>
                        Name
                    </div>
                    <div>
                        Weight
                    </div>
                    <div>
                        ChildrenSkill
                    </div>
                    <div>
                        Create Date
                    </div>
                </div>
            </div>

            {!loading && (
                <div className="skill-list-container overflow-y-auto max-h-60">
                    {skills.map((skill) => (
                        skill.childrenSkill ? (
                            <Link to={`/expert/subjects/${subjectId}/skills/${skill.id}`} key={skill.id}>
                                <div className="grid grid-cols-4 p-4 ml-7 gap-x-3 mr-3 items-center hover:bg-slate-100">
                                    <div className="font-montserrat font-medium">
                                        {skill.name}
                                    </div>

                                    <div className="font-montserrat ml-4 font-medium">
                                        {skill.formula}
                                    </div>

                                    <div className="font-montserrat font-medium">
                                        {skill.childrenSkill ? "True" : "False"}
                                    </div>

                                    <div className="flex gap-x-28 font-montserrat font-medium">
                                        {skill.createDate}

                                        <div onClick={(e) => {
                                            e.preventDefault();
                                            handleEditSkillClick(skill.id);
                                        }} className='flex'>
                                            <button onClick={handleEditSkillPopup} className="bg-[#a6bf16] p-1 rounded-md text-white mr-5"><FaEdit className="size-4" /></button>
                                            <button onClick={() => handleDeleteButton(skill.id)} className="bg-[#a30303] p-1 rounded-md text-white mr-5"><MdDelete className="size-4" /></button>
                                        </div>
                                    </div>

                                </div>
                                <div className="ml-7 gap-x-3 mr-3 border-[1px] border-b-gray-200"></div>

                            </Link>
                        ) : (
                            <div>
                                <div onClick={() => handleSkillClick(skill.id)} className="grid grid-cols-4 p-4 ml-7 mr-3 gap-x-3 items-center cursor-pointer hover:bg-slate-100">
                                    <div className="font-montserrat font-medium">
                                        {skill.name}
                                    </div>

                                    <div className="font-montserrat  ml-4 font-medium">
                                        {skill.formula}
                                    </div>

                                    <div className="font-montserrat font-medium">
                                        {skill.childrenSkill ? "True" : "False"}
                                    </div>

                                    <div className="flex gap-x-28 font-montserrat font-medium">
                                        {skill.createDate}
                                        <div onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            handleEditSkillClick(skill.id);
                                        }} className='flex'>
                                            <button onClick={handleEditSkillPopup} className="bg-[#a6bf16] p-1 rounded-md text-white mr-5"><FaEdit className="size-4" /></button>
                                            <button onClick={() => handleDeleteButton(skill.id)} className="bg-[#a30303] p-1 rounded-md text-white mr-5"><MdDelete className="size-4" /></button>
                                        </div>
                                    </div>

                                </div>

                                <div className="ml-7 gap-x-3 mr-3 border-[1px] border-b-gray-200"></div>

                            </div>
                        )
                    ))}
                </div>
            )}

            {popup && (
                <selectedSkillContext.Provider value={{ selectedSkillId, setPopup }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <Indicator></Indicator>
                    </div>
                </selectedSkillContext.Provider>
            )}


            {editSkillPopup && (
                <editSkillContext.Provider value={{ selectedEditSkillId, setEditSkillPopup, render, setRender }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <EditSkill></EditSkill>
                    </div>
                </editSkillContext.Provider>
            )}

            {showModal && (
                <skillContext.Provider value={{ subjectId, showModal, setShowModal, skills, setSkills, check, setCheck }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <NewSkill onSuccessCreate={() => toast.success("Skill created successfully! 🎉")}></NewSkill>
                    </div>
                </skillContext.Provider>
            )}

            {deleteSkillPopup && (
                <deleteSkillContext.Provider value={{ selectedEditSkillId, setDeleteSkillPopup, render, setRender }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <DeleteSkill onSuccessDelete={() => toast.success("Skill deleted successfully! 🎉")}></DeleteSkill>
                    </div>
                </deleteSkillContext.Provider>
            )}

            {editPopup && (
                <editSubjectContext.Provider value={{ subject, setSubject, editPopup, setEditPopup }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <EditSubject></EditSubject>
                    </div>
                </editSubjectContext.Provider>
            )}

            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    )
}