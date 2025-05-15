import { TiDelete } from "react-icons/ti";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
import { editSkillContext } from "./SubjectDetail";

export const EditSkill = () => {

    const { selectedEditSkillId } = useContext(editSkillContext);
    const { setEditSkillPopup } = useContext(editSkillContext);
    const { render, setRender } = useContext(editSkillContext);
    const [skill, setSkill] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/skills/id=${selectedEditSkillId}`)
                .then(response => {
                    {
                        setSkill(response.data)
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        };

        fetchData();

    }, [selectedEditSkillId])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSkill({
            ...skill,
            [name]: value,
        });
    };

    const handleSave = async () => {
        axios.put(`https://studentperformancetrackingbackend-production.up.railway.app/skills/update/id=${selectedEditSkillId}`, skill)
            .then(response => {
                {
                    setSkill(response.data)
                    setEditSkillPopup(false);
                    setRender(render+1)
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    return (
        <div className="flex flex-col gap-y-4 bg-white font-montserrat p-6 rounded-2xl w-[500px] shadow-lg">
            <div className="flex justify-between items-center">
                <h2 className="font-bold text-2xl">Edit skill: <span className="text-[#03966c]">{skill.name}</span></h2>
                <button className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete className="size-7" />
                </button>
            </div>

            <div className="border-b border-gray-300"></div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={skill.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold">Weight:</label>
                <input
                    type="text"
                    name="formula"
                    value={skill.formula}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                />
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold">Description:</label>
                <input
                    type="text"
                    name="description"
                    value={skill.description}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-lg"
                />
            </div>

            <div className="flex justify-center bg-gradient-to-l from-[#3ccb9b] to-[#1c8764] mt-1 rounded-lg">
                <button
                    onClick={handleSave}
                    className=" py-2 px-6 rounded-lg text-white hover:opacity-90 transition"
                >
                    Save
                </button>
            </div>
        </div>
    )
}