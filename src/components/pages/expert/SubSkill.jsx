import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from "react";
import { FaAngleDown } from "react-icons/fa6";



export const SubSkill = () => {
    const { subjectId, skillId } = useParams();

    const subId = subjectId.split('=')[1];
    const skId = skillId.split('=')[1];

    const [subjectName, setSubjectName] = useState(null);
    const [subSkillName, setSubSkillName] = useState(null);
    const [subSkills, setSubSkills] = useState([]);

    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            axios.get(`http://localhost:8080/subjects`)
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
            axios.get(`http://localhost:8080/subjects/${subId}/skills/${skId}`)
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
            axios.get(`http://localhost:8080/subjects/${subId}/skills`)
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

    }, [])


    return (
        <div className="flex flex-col h-full bg-white m-8 p-3">
            <div className="flex">
                <div className="text-3xl px-8 py-4 font-montserrat font-semibold">
                    Manage Subject / {subjectName} / {subSkillName}
                </div>
            </div>

            {!loading && (
                <div>
                    {subSkills.map((skill) => (
                            <div key={skill.id} className="flex p-4 ml-7 gap-x-3 mt-3 mr-3 bg-neutral-200 items-center">
                                <FaAngleDown className="-rotate-90" />
                                <div className="font-montserrat font-semibold">
                                    {skill.name}
                                </div>
                            </div>
                    ))}
                </div>
            )}
        </div>

        
    )
}