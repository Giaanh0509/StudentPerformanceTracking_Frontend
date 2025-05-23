import { useParams, useLocation, Link } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";

export const subSkillContext = createContext();
export const indicatorSubSkillContext = createContext();


export const SubSkillTeacher = () => {
    const { subjectId, skillId } = useParams();

    const skId = skillId.split('=')[1];

    console.log(subjectId);
    console.log(skillId);

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
        subjectId: subjectId,
        children: "true"
    });


    useEffect(() => {
        const fetchData = async () => {
            axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/subjects`)
                .then(response => {
                    {
                        response.data._embedded.subjects.map(subject => {
                            if (subject.id == subjectId) {
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
            axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/subjects/${subjectId}/skills/${skillId}`)
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
            axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/subjects/${subjectId}/skills`)
                .then(response => {
                    const skillsData = response.data._embedded?.skills || [];
                    const filteredSubSkills = skillsData.filter((sk) => sk.parentSkill && sk.parentSkill.id == skillId);

                    setSubSkills(filteredSubSkills);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

            setLoading(false)
        };

        fetchData();

    }, [check])


    return (
        <div className="flex flex-col h-full bg-white rounded-xl  m-8 p-3">
            <div className="flex">
                <div className="text-3xl px-8 py-4 font-montserrat font-semibold">
                    Manage Subject / {subjectName} / {subSkillName}
                </div>
            </div>

            <div className="flex justify-between mb-3">
                <div className="mt-3 ml-8">
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for subskil" />
                </div>
                <div className="flex items-center gap-x-2 p-2 bg-gradient-to-t rounded-lg from-[#8dbaaa] to-[#14ce90] m-3 text-white">
                    <IoIosAddCircle className="size-5" />
                    <button onClick={handleButton} className="text-base font-montserrat font-medium">
                        Create New SubSkill
                    </button>
                </div>
            </div>

            {!loading && (
                <div>
                    {subSkills.map((skill) => (
                        skill.childrenSkill ? (
                            <Link to={`/admin/subjects/id=${subjectId}/skills/id=${skillId}/subskills/id=${skill.id}`} key={skill.id}>
                                <div key={skill.id} className="flex p-4 ml-7 gap-x-3 mt-3 mr-3 bg-neutral-200 items-center">
                                    <FaAngleDown className="-rotate-90" />
                                    <div className="font-montserrat font-semibold">
                                        {skill.name}
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div key={skill.id} onClick={() => handleSkillClick(skill.id)} className="flex p-4 ml-7 gap-x-3 mt-3 mr-3 bg-neutral-200 items-center">
                                <FaAngleDown className="-rotate-90" />
                                <div className="font-montserrat font-semibold">
                                {skill.name}
                                </div>
                            </div>
                        )
                    ))}
                </div>
            )}

            {showModal && (
                <subSkillContext.Provider value={{ subjectId, skillId, showModal, setShowModal, skills, setSkills, check, setCheck }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    </div>
                </subSkillContext.Provider>
            )}
        </div>


    )
}