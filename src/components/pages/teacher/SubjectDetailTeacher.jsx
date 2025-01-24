import { useParams, useLocation } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import { Indicator } from '../expert/Indicator';
import { selectedSkillContext } from "../expert/selectedSkillContext";

export const skillContext = createContext();
export const indicatorContext = createContext();


export const SubjectDetailTeacher = () => {

    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    console.log(id);

    const [subject, setSubject] = useState({
        id: "",
        name: "",
        createDate: ""
    });

    const [showModal, setShowModal] = useState(false);
    const [popup, setPopup] = useState(false);

    const [check, setCheck] = useState(false);

    const [selectedSkillId, setSelectedSkillId] = useState(null);

    const handleButton = () => {
        setShowModal(true);
    };

    const handleSkillClick = (skillId) => {
        setSelectedSkillId(skillId);
        setPopup(true);
    };

    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            setShowModal(false);
            setPopup(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`http://localhost:8080/subjects`)
                .then(response => {
                    {
                        response.data._embedded.subjects.map(subject => {
                            if (subject.id == id) {
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setCheck(false);

            try {
                const response = await axios.get(`http://localhost:8080/subjects/${id}/skills`);
                const skillsData = response.data._embedded?.skills || [];

                const parentSkills = skillsData.filter(skill => skill.parentSkill === null);

                setSkills(parentSkills);
            } catch (error) {
                console.log(error);
            }

            setLoading(false)
        };

        fetchData();

    }, [check])

    console.log(selectedSkillId);

    return (
        <div className='flex flex-col h-full bg-white border-round m-8 p-3'>
            <div className="flex">
                <div className="text-3xl px-8 py-4 font-montserrat font-semibold">
                    Subjects / {subject.name}
                </div>
            </div>

            <div className='flex justify-between ml-8 mr-3'>
                <div className='w-80 h-44 bg-neutral-200 my-5'>
                    <div className='flex flex-col my-3 gap-y-3'>
                        <div className='flex justify-center text-xl font-bold mb-5'>
                            Number of uses
                        </div>
                        <div className='text-6xl flex justify-center'>
                            5
                        </div>
                    </div>
                </div>

                <div className='w-3/5 h-44 bg-neutral-200  my-5 py-3 px-4 gap-y-5'>
                    <div className='text-xl flex items-center gap-x-4 font-montserrat font-bold mb-3'>Infomation
                    </div>
                    <div className='flex font-medium justify-between mr-[75px] mb-3'>
                        <div className='flex gap-x-2'>Name:<div className='text-[#348a6c]'>
                            {subject.name}
                        </div></div>
                        <div className='flex gap-x-2'>Create date:
                            <div className='text-[#348a6c]'>{subject.createDate}</div></div>
                    </div>

                    <div className='flex font-medium justify-between mr-16'>Description: IELTS is a globally recognized test that evaluates English language skills in listening, reading, writing, and speaking for academic, immigration, or professional purposes.</div>

                </div>
            </div>

            <div className="px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 rounded-md bg-neutral-200 items-center">
                <div className="grid grid-cols-4 font-montserrat font-bold ">
                    <div>
                        Name
                    </div>
                    <div>
                        Fomula
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
                <div>
                    {skills.map((skill) => (
                        skill.childrenSkill ? (
                            <Link to={`/teacher/subjects/${id}/skills/${skill.id}`} key={skill.id}>
                                <div className="grid grid-cols-4 p-4 ml-7 gap-x-3 mt-3 mr-3 items-center">
                                    <div className="font-montserrat font-medium">
                                        {skill.name}
                                    </div>

                                    <div className="font-montserrat font-medium">
                                        {skill.formula}
                                    </div>

                                    <div className="font-montserrat font-medium">
                                        {skill.childrenSkill ? "True" : "False"}
                                    </div>

                                    <div className="font-montserrat font-medium">
                                        {skill.createDate}
                                    </div>

                                </div>
                                <div className="ml-7 gap-x-3 mr-3 border-[1px] border-b-gray-200"></div>
                            </Link>
                        ) : (
                            <div>
                                <div onClick={() => handleSkillClick(skill.id)} className="grid grid-cols-4 p-4 ml-7 gap-x-3 mt-3 mr-3 items-center cursor-pointer">
                                    <div className="font-montserrat font-medium">
                                        {skill.name}
                                    </div>

                                    <div className="font-montserrat font-medium">
                                        {skill.formula}
                                    </div>

                                    <div className="font-montserrat font-medium">
                                        {skill.childrenSkill ? "True" : "False"}
                                    </div>

                                    <div className="font-montserrat font-medium">
                                        {skill.createDate}
                                    </div>
                                </div>

                                <div className="ml-7 gap-x-3 mr-3 border-[1px] border-b-gray-200"></div>

                            </div>
                        )
                    ))}
                </div>
            )}

            {popup && (
                <selectedSkillContext.Provider value={{ selectedSkillId }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <Indicator></Indicator>
                    </div>
                </selectedSkillContext.Provider>
            )}

            {showModal && (
                <skillContext.Provider value={{ id, showModal, setShowModal, skills, setSkills, check, setCheck }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    </div>
                </skillContext.Provider>
            )}

        </div>
    )
}