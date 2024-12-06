import { useContext, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { skillContext } from "./SubjectDetail";
import SkillService from "../../../services/SkillService";

export const NewSkill = () => {

    const { subjectId } = useContext(skillContext);
    const { showModal, setShowModal } = useContext(skillContext);
    const {skills, setSkills} = useContext(skillContext);
    const {check, setCheck} = useContext(skillContext);

    const [skill, setSkill] = useState({
        id: "",
        name: "",
        description: "",
        formula: "",
        subjectId: subjectId
    });
    
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSkill({ ...skill, [e.target.name]: value });
    }

    const saveSkill = (e) => {
        e.preventDefault();
    
        SkillService.saveSkill(skill)
            .then((response) => {
                const newSkill = response.data;
                console.log(newSkill);
                setCheck(true);

                setSkills((prevSkills) => [newSkill, ...prevSkills]);
                setShowModal(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    console.log(skills);

    return (
        <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg w-[750px] h-2/3">
            <div className="flex justify-between">
                <div className="font-bold text-xl">Create new skill</div>
                <TiDelete onClick={handleCloseModal} className="size-7" />
            </div>
            <div className="border-[1px] border-b-gray-400"></div>
            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Name:</div>
                <input
                    type="text"
                    name="name"
                    value={skill.name}
                    onChange={(e) => handleChange(e)}
                    className="border-2 p-2 w-80 mr-64" />
            </div>

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Formula:</div>

                <input
                    type="text"
                    name="formula"
                    value={skill.formula}
                    onChange={(e) => handleChange(e)}
                    className="border-2 p-2 w-80 mr-64" />
            </div>

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Description:</div>

                <input
                    type="text"
                    name="description"
                    value={skill.description}
                    onChange={(e) => handleChange(e)}
                    className="border-2 p-2 w-80 mr-64" />
            </div>

            <div className="flex justify-end">
                <button onClick={saveSkill} className="bg-gradient-to-l from-[#4df1bb] to-[#1c8764] py-2 px-4 rounded-lg">Create</button>
            </div>
        </div>
    )
}