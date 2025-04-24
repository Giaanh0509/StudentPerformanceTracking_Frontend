import { useContext, useState } from "react";
import { TiDelete } from "react-icons/ti";
import { skillContext } from "./SubjectDetail";
import SkillService from "../../../services/SkillService";
import IndicatorService from "../../../services/IndicatorService";

export const NewSkill = ({ onSuccessCreate }) => {

    const { subjectId } = useContext(skillContext);
    const { showModal, setShowModal } = useContext(skillContext);
    const { skills, setSkills } = useContext(skillContext);
    const { check, setCheck } = useContext(skillContext);

    const [errors, setErrors] = useState({
        name: false,
        description: false,
        formula: false,
        indicatorName: false,
        evaluationType: false,
        scaleMin: false,
        scaleMax: false
    });

    const [skill, setSkill] = useState({
        id: "",
        name: "",
        description: "",
        formula: "",
        createDate: "",
        subjectId: subjectId,
        parentSkillId: "",
        childrenSkill: "true"
    });

    const [indicator, setIndicator] = useState({
        id: "",
        name: "",
        scale_max: "",
        scale_min: "",
        evaluation_type: "",
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
        setSkill({ ...skill, childrenSkill: value });
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSkill({ ...skill, [e.target.name]: value });
    }

    const saveSkill = (e) => {
        e.preventDefault();

        const newErrors = {
            name: !skill.name,
            description: !skill.description,
            formula: !skill.formula,
            indicatorName: !skill.childrenSkill && !indicator.name,
            evaluationType: !skill.childrenSkill && !indicator.evaluation_type,
            scaleMin: !skill.childrenSkill && !indicator.scale_min,
            scaleMax: !skill.childrenSkill && !indicator.scale_max
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((v) => v);
        if (hasError) return;

        const currentDate = new Date().toISOString().split('T')[0];
        const newSkill = {
            ...skill,
            createDate: currentDate
        };

        SkillService.saveSkill(newSkill)
            .then((response) => {
                const createdSkill = response.data;
                const newSkillId = createdSkill.id;

                console.log(response.data);

                setCheck(true);

                setSkills((prevSkills) => [createdSkill, ...prevSkills]);
                if (skill.childrenSkill === false) {
                    const newIndicator = {
                        ...indicator,
                        skillId: newSkillId
                    };

                    console.log(newIndicator);

                    IndicatorService.saveIndicator(newIndicator)
                        .then((indicatorResponse) => {
                            console.log('Indicator created:', indicatorResponse.data);
                        })
                        .catch((indicatorError) => {
                            console.error('Error creating indicator:', indicatorError);
                        });
                }

                setShowModal(false);
                onSuccessCreate && onSuccessCreate();
            })
            .catch((err) => {
                console.error(err);
            })

    }

    return (
        <div className="flex flex-col gap-y-4 bg-white px-4 pb-4 rounded-lg w-[600px] h-auto font-montserrat">
            <div className="flex justify-between sticky top-0 bg-white px-2 py-3 z-10 border-b-[1px] border-gray-400">
                <div className="font-bold text-xl text-[#03966c]">Create New Skill</div>
                <TiDelete onClick={handleCloseModal} className="size-7 hover:text-red-500 transition" />
            </div>
            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Name:</div>
                <input
                    type="text"
                    name="name"
                    value={skill.name}
                    onChange={(e) => handleChange(e)}
                    className={`border-2 p-1 border-[#979c9b] w-96 mr-10 rounded-lg ${errors.name ? "border-red-500 focus:ring-red-500" : ""
                }`} />
            </div>

            {errors.name && <p className="text-red-500 text-sm text-left ml-36">Name is required.</p>}

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Weight:</div>

                <input
                    type="number"
                    name="formula"
                    value={skill.formula}
                    onChange={(e) => handleChange(e)}
                    className={`border-2 border-[#979c9b] p-1 w-96 mr-10 rounded-lg ${errors.formula ? "border-red-500 focus:ring-red-500" : ""
                }`} />
            </div>

            {errors.formula && <p className="text-red-500 text-sm text-left ml-36">Weight is required.</p>}

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Description:</div>

                <textarea
                    name="description"
                    value={skill.description}
                    onChange={(e) => handleChange(e)}
                    className={`border-2 border-[#979c9b] p-1 w-96 mr-10 h-auto min-h-[5rem] rounded-lg resize-none overflow-hidden ${errors.description ? "border-red-500 focus:ring-red-500" : ""
                }`}
                    rows="1"
                    onInput={(e) => {
                        e.target.style.height = "auto";
                        e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                ></textarea>
            </div>

            {errors.description && <p className="text-red-500 text-sm text-left ml-36">Description is required.</p>}


            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Create Children?</div>
                <div className="flex gap-x-4 mr-auto">
                    <label>
                        <input
                            type="radio"
                            name="childrenSkill"
                            value="true"
                            checked={skill.childrenSkill === true}
                            onChange={handleChildrenChange}
                        />
                        Yes
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="childrenSkill"
                            value="false"
                            checked={skill.childrenSkill === false}
                            onChange={handleChildrenChange}
                        />
                        No
                    </label>
                </div>
            </div>

            {skill.childrenSkill === false && (
                <div className="flex flex-col gap-y-5">
                    <div className="font-bold text-xl text-[#03966c]">Create indicators for skill</div>
                    <div className="flex justify-between gap-x-5">
                        <div className="font-semibold">Name:</div>
                        <input
                            type="text"
                            name="name"
                            value={indicator.name}
                            onChange={(e) => handleChangeIndicator(e)}
                            className="border-2 border-[#979c9b] p-1 w-96 mr-10 rounded-lg" />
                    </div>

                    {errors.indicatorName && <p className="text-red-500 text-sm text-left ml-36">IndicatorName is required.</p>}

                    <div className="flex justify-between gap-x-5">
                        <div className="font-semibold">Type:</div>
                        <input
                            type="text"
                            name="evaluation_type"
                            value={indicator.evaluation_type}
                            onChange={(e) => handleChangeIndicator(e)}
                            className="border-2 border-[#979c9b] p-1 w-96 mr-10 rounded-lg" />
                    </div>

                    <div className="flex justify-between gap-x-20">
                        <div className="flex gap-x-12 mr-1">
                            <div className="font-semibold">Min Scale:</div>
                            <input
                                type="number"
                                name="scale_min"
                                value={indicator.scale_min}
                                onChange={(e) => handleChangeIndicator(e)}
                                className="border-2 ml-4 border-[#979c9b] p-1 w-20 rounded-lg" />
                        </div>

                        <div className="flex gap-x-12 mr-auto ml-3">
                            <div className="font-semibold">Max Scale:</div>
                            <input
                                type="number"
                                name="scale_max"
                                value={indicator.scale_max}
                                onChange={(e) => handleChangeIndicator(e)}
                                className="border-2 border-[#979c9b] p-1 w-20 rounded-lg" />
                        </div>
                    </div>

                </div>
            )}

            <div className="flex justify-center bg-gradient-to-l from-[#41c699] to-[#1c8764] rounded-lg mt-4">
                <button onClick={saveSkill} className="py-2 text-white px-4 rounded-lg">Create</button>
            </div>
        </div>
    )
}