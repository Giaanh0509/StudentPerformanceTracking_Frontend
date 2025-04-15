import { useParams} from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

export const SubSubSkill = () => {
    const { subjectId, skillId, subSkillId } = useParams();

    const subId = subjectId.split('=')[1];
    const sId = skillId.split('=')[1];
    const skId = subSkillId.split('=')[1];

    const [subjectName, setSubjectName] = useState(null);
    const [subSkillName, setSubSkillName] = useState(null);
    const [subSubSkillName, setSubSubSkillName] = useState(null);

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
            axios.get(`http://localhost:8080/subjects/${subId}/skills/${sId}`)
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
            axios.get(`http://localhost:8080/subjects/${subId}/skills/${skId}`)
                .then(response => {
                    setSubSubSkillName(response.data.name);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        };

        fetchData();

    }, [])

    return (
        <div className="flex flex-col h-[640px] bg-white rounded-xl mx-6 mt-4 p-3 shadow-lg shadow-slate-400">
            <div className="flex">
                <div className="text-2xl text-[#046b49] px-8 py-4 font-montserrat font-semibold">
                    Manage Subject / {subjectName} / {subSkillName} / {subSubSkillName}
                </div>
            </div>
        </div>
    )
}