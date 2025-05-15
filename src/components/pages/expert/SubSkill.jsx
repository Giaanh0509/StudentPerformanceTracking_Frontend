import { useParams, useLocation, Link } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { NewSkill } from './NewSkill';
import { NewSubSkill } from './NewSubSkill';
import { Indicator } from './Indicator';
import { selectedSkillContext } from "./selectedSkillContext";
import { useNavigate } from 'react-router-dom';
import { AiOutlineArrowLeft } from "react-icons/ai";


export const subSkillContext = createContext();
export const indicatorSubSkillContext = createContext();

export const SubSkill = () => {
    const { subjectId, skillId } = useParams();

    const subId = subjectId;
    const skId = skillId;

    const [subjectName, setSubjectName] = useState(null);
    const [subSkillName, setSubSkillName] = useState(null);
    const [subSkills, setSubSkills] = useState([]);

    const [loading, setLoading] = useState(true);

    const [popup, setPopup] = useState(false);
    const [selectedSkillId, setSelectedSkillId] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [skills, setSkills] = useState([]);

    const [check, setCheck] = useState(false);

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

    const [skill, setSkill] = useState({
        id: "",
        name: "",
        description: "",
        formula: "",
        createDate: "",
        subjectId: subId,
        children: "true"
    });


    useEffect(() => {
        const fetchData = async () => {
            axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/subjects`)
                .then(response => {
                    {
                        response.data._embedded.subjects.map(subject => {
                            if (subject.id == subId) {
                                setSubjectName(subject.name)
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
            axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/subjects/${subId}/skills/${skId}`)
                .then(response => {
                    setSubSkillName(response.data.name);
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
            axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/subjects/${subId}/skills`)
                .then(response => {
                    const skillsData = response.data._embedded?.skills || [];
                    const filteredSubSkills = skillsData.filter((sk) => sk.parentSkill && sk.parentSkill.id == skId);

                    setSubSkills(filteredSubSkills);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

            setLoading(false)
        };

        fetchData();

    }, [check])

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(`/expert/subjects/${subId}`);
    };

    return (
        <div className="flex flex-col h-[640px] bg-white rounded-xl mx-6 mt-4 p-3 shadow-lg shadow-slate-400">
            <div className="flex items-center">
                <button
                    onClick={handleGoBack}
                    className="flex items-center text-[#046b49] hover:text-[#034d36]"
                >
                    <AiOutlineArrowLeft className="text-2xl" />
                </button>
                <div className="text-2xl text-[#046b49] pr-8 pl-2 py-4 font-montserrat font-semibold">
                    Manage Subject / {subjectName} / {subSkillName}
                </div>
            </div>

            <div className="flex justify-between mb-3 text-sm">
                <div className=" ml-7 mr-auto">
                    <div className="flex gap-x-2 p-[8px] border-[1px] rounded-lg w-auto border-[#7fa195]" name="" id="">
                        Number of subSkills: <span className="font-bold">{subSkills.length}</span>
                    </div>
                </div>

                <div className="flex items-center text-sm gap-x-2 p-2 bg-gradient-to-t rounded-lg from-[#8dbaaa] to-[#14ce90] mx-3 text-white">
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

                    <div className="">
                        Fomula
                    </div>

                    <div className="">
                        ChildrenSkill
                    </div>

                    <div className="">
                        Create Date
                    </div>
                </div>
            </div>

            {!loading && (
                <div>
                    {subSkills.map((subSkill) => (
                        subSkill.childrenSkill ? (
                            <Link to={`/expert/subjects/id=${subId}/skills/id=${skId}/subskills/id=${subSkill.id}`} key={subSkill.id}>
                                <div key={subSkill.id} className="grid grid-cols-4 px-4 py-4 ml-7 font-montserrat font-medium gap-x-3 items-center hover:bg-slate-100">
                                    <div className="">
                                        {subSkill.name}
                                    </div>

                                    <div>
                                        {subSkill.formula}
                                    </div>

                                    <div>
                                        {subSkill.childrenSkill ? "True" : "False"}
                                    </div>

                                    <div>{subSkill.createDate}</div>
                                </div>

                                <div className="ml-7 gap-x-3 mr-3 border-[1px] border-b-gray-200"></div>
                            </Link>
                        ) : (
                            <div>
                                <div key={subSkill.id} onClick={() => handleSkillClick(subSkill.id)} className="grid grid-cols-4 px-4 py-4 ml-7  font-medium font-montserrat gap-x-3 items-center hover:bg-slate-100">
                                    <div className="">
                                        {subSkill.name}
                                    </div>

                                    <div>
                                        {subSkill.formula}
                                    </div>

                                    <div>
                                        {subSkill.childrenSkill ? "True" : "False"}
                                    </div>

                                    <div>{subSkill.createDate}</div>
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
                <subSkillContext.Provider value={{ subId, skId, showModal, setShowModal, skills, setSkills, check, setCheck }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <NewSubSkill></NewSubSkill>
                    </div>
                </subSkillContext.Provider>
            )}
        </div>


    )
}