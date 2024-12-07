import { useContext, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { skillContext } from "./SubjectDetail";
import SkillService from "../../../services/SkillService";

export const NewSkill = () => {

    const { subjectId } = useContext(skillContext);
    const { showModal, setShowModal } = useContext(skillContext);
    const { skills, setSkills } = useContext(skillContext);
    const { check, setCheck } = useContext(skillContext);

    const [skill, setSkill] = useState({
        id: "",
        name: "",
        description: "",
        formula: "",
        createDate: "",
        subjectId: subjectId,
        children: "true"
    });

    const [indicator, setIndicator] = useState({
        id: "",
        name: "",
        scale_max: "",
        scale_min: "",
        evauation_type: "",
    })

    const handleChangeIndicator = (e) => {
        const value = e.target.value;
        setIndicator({ ...indicator, [e.target.name]: value });
    }

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChildrenChange = (e) => {
        const value = e.target.value === "true";
        setSkill({ ...skill, children: value });
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSkill({ ...skill, [e.target.name]: value });
    }

    const saveSkill = (e) => {
        e.preventDefault();

        const currentDate = new Date().toISOString().split('T')[0];
        const newSkill = {
            ...skill,
            createDate: currentDate
        };

        SkillService.saveSkill(newSkill)
            .then((response) => {
                const newSkill = response.data;
                setCheck(true);

                setSkills((prevSkills) => [newSkill, ...prevSkills]);
                setShowModal(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    console.log(indicator);

    return (
        <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg w-[750px] h-3/4">
            <div className="flex justify-between">
                <div className="font-bold text-xl text-[#08c891]">Create new skill</div>
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
                    className="border-2 p-1 w-80 mr-64" />
            </div>

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Formula:</div>

                <input
                    type="text"
                    name="formula"
                    value={skill.formula}
                    onChange={(e) => handleChange(e)}
                    className="border-2 p-1 w-80 mr-64" />
            </div>

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Description:</div>

                <input
                    type="text"
                    name="description"
                    value={skill.description}
                    onChange={(e) => handleChange(e)}
                    className="border-2 p-1 w-80 mr-64" />
            </div>

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Create Children?</div>
                <div className="flex gap-x-4 mr-auto">
                    <label>
                        <input
                            type="radio"
                            name="children"
                            value="true"
                            checked={skill.children === true}
                            onChange={handleChildrenChange}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="children"
                            value="false"
                            checked={skill.children === false}
                            onChange={handleChildrenChange}
                        />
                        No
                    </label>
                </div>
            </div>

            {skill.children === false && (
                <div className="flex flex-col gap-y-5">
                    <div className="font-bold text-xl text-[#08c891]">Create indicators for skill</div>
                    <div className="flex justify-between gap-x-5">
                        <div className="font-semibold">Name:</div>
                        <input
                            type="text"
                            name="name"
                            value={indicator.name}
                            onChange={(e) => handleChangeIndicator(e)}
                            className="border-2 p-1 w-80 mr-64" />
                    </div>

                    <div className="flex justify-between gap-x-5">
                        <div className="font-semibold">Type:</div>
                        <input
                            type="text"
                            name="evauation_type"
                            value={indicator.evauation_type}
                            onChange={(e) => handleChangeIndicator(e)}
                            className="border-2 p-1 w-80 mr-64" />
                    </div>

                    <div className="flex justify-between gap-x-5">
                        <div className="flex gap-x-16 mr-1">
                        <div className="font-semibold">Min Scale:</div>
                        <input
                            type="number"
                            name="scale_min"
                            value={indicator.scale_min}
                            onChange={(e) => handleChangeIndicator(e)}
                            className="border-2 p-1 w-20" />
                        </div>    

                        <div className="flex gap-x-16 mr-auto">
                        <div className="font-semibold">Max Scale:</div>
                        <input
                            type="number"
                            name="scale_max"
                            value={indicator.scale_max}
                            onChange={(e) => handleChangeIndicator(e)}
                            className="border-2 p-1 w-20" />
                        </div>    
                    </div>

                </div>
            )}

            <div className="flex justify-end">
                <button onClick={saveSkill} className="bg-gradient-to-l from-[#41c699] to-[#1c8764] py-2 text-white px-4 rounded-lg">Create</button>
            </div>
        </div>
    )
}