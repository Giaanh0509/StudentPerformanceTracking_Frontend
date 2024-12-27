import { useParams, useLocation } from 'react-router-dom';
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { Link } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";
import { NewSkill } from './NewSkill';
import { CiEdit } from "react-icons/ci";
import { Indicator } from './Indicator';
import { selectedSkillContext } from "./selectedSkillContext";


export const skillContext = createContext();
export const indicatorContext = createContext();


export const SubjectDetail = () => {

    const { id } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const subjectId = id.split('=')[1];
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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setCheck(false);

            try {
                const response = await axios.get(`http://localhost:8080/subjects/${subjectId}/skills`);
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
        <div className='flex flex-col h-full bg-white rounded-xl m-8 p-1'>
            <div className="flex">
                <div className="text-2xl text-[#046b49] px-8 py-4 font-montserrat font-semibold">
                    Manage Subject / {subject.name}
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
                        <CiEdit />
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


            <div className="flex justify-between mb-3 ml-8">
                <div className="mt-3">
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for skill" />
                </div>
                <div className="flex items-center gap-x-2 p-2 bg-gradient-to-t rounded-lg from-[#8dbaaa] to-[#14ce90] m-3 text-white">
                    <IoIosAddCircle className="size-5" />
                    <button onClick={handleButton} className="text-base font-montserrat font-medium">
                        Create New Skill
                    </button>
                </div>
            </div>

            {!loading && (
                <div>
                    {skills.map((skill) => (
                        skill.childrenSkill ? (
                            <Link to={`/admin/subjects/id=${subjectId}/skills/id=${skill.id}`} key={skill.id}>
                                <div className="flex p-4 ml-7 gap-x-3 mt-3 mr-3 bg-neutral-200 items-center">
                                    <FaAngleDown className="-rotate-90" />
                                    <div className="font-montserrat font-semibold">
                                        {skill.name}
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div onClick={() => handleSkillClick(skill.id)} className="flex p-4 ml-7 gap-x-3 mt-3 mr-3 bg-neutral-200 items-center">
                                <FaAngleDown className="-rotate-90" />
                                <div className="font-montserrat font-semibold">
                                    {skill.name}
                                </div>
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
                <skillContext.Provider value={{ subjectId, showModal, setShowModal, skills, setSkills, check, setCheck }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <NewSkill></NewSkill>
                    </div>
                </skillContext.Provider>
            )}

        </div>
    )
}