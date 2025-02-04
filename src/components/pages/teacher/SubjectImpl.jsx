import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { modalContext } from "./SubjectTeacher";

export const SubjectImpl = () => {
    const { selectedSubjectId } = useContext(modalContext);
    const { showModal, setShowModal } = useContext(modalContext);
    const [subject, setSubject] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState("");
    const [userInfo, setUserInfo] = useState({ id: "", name: "", roleId: "" });
    const [skills, setSkills] = useState([]);
    const [skillIndicator, setSkillIndicator] = useState([]);
    const [indicators, setIndicators] = useState([]);
    const [objectives, setObjectives] = useState([]);
    const [inputName, setInputName] = useState("");


    const handleChange = (e, indicatorId) => {
        const { name, value } = e.target;
        setObjectives(prevObjectives => {
            const updatedObjectives = [...prevObjectives];
            const index = updatedObjectives.findIndex(obj => obj.indicator_id === indicatorId);

            if (index !== -1) {
                updatedObjectives[index] = { ...updatedObjectives[index], [name]: value };
            } else {
                updatedObjectives.push({
                    indicator_id: indicatorId,
                    start_value: "",
                    objective_value: "",
                    start_date: "",
                    end_date: "",
                    [name]: value
                });
            }
            return updatedObjectives;
        });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleGroupChange = (e) => {
        setSelectedGroup(parseInt(e.target.value, 10));
    };

    const handleNameChange = (e) => {
        setInputName(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const dataToSend = {
                group_id: selectedGroup,
                objectiveName: inputName,
                objectives: objectives
            };
            await axios.post("http://localhost:8080/objectives/new", dataToSend);
            alert("Data submitted successfully!");
            setShowModal(false);
        } catch (error) {
            console.error("Error submitting data:", error);
            alert("Failed to submit data.");
        }
    };

    useEffect(() => {
        const storedUserLoginDTO = localStorage.getItem("userLoginDTO");
        if (storedUserLoginDTO) {
            try {
                const userLoginDTO = JSON.parse(storedUserLoginDTO);
                setUserInfo(userLoginDTO);
            } catch (e) {
                console.error("Error parsing userLoginDTO from localStorage:", e);
            }
        }
    }, []);

    useEffect(() => {
        if (userInfo.id) {
            axios.get(`http://localhost:8080/groups/userId=${userInfo.id}`)
                .then(response => setGroups(response.data || []))
                .catch(error => console.error("Error fetching groups:", error));
        }
    }, [userInfo]);

    useEffect(() => {
        axios.get(`http://localhost:8080/subjects/subjectId=${selectedSubjectId}`)
            .then(response => response.data && setSubject(response.data))
            .catch(error => console.error("Error fetching subject:", error));
    }, [selectedSubjectId]);

    useEffect(() => {
        axios.get(`http://localhost:8080/subjects/${selectedSubjectId}/skills`)
            .then(response => {
                const skillsData = response.data._embedded?.skills || [];
                setSkillIndicator(skillsData.filter(skill => skill.childrenSkill === false));
                setSkills(skillsData);
            })
            .catch(error => console.log(error));
    }, []);

    useEffect(() => {
        if (skillIndicator.length > 0) {
            Promise.all(skillIndicator.map(skill => axios.get(`http://localhost:8080/indicators/skillId=${skill.id}`)))
                .then(responses => setIndicators(responses.map(res => res.data)))
                .catch(error => console.error("Fetch error:", error));
        }
    }, [skillIndicator]);

    console.log(objectives);

    return (
        <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg w-[1200px] h-5/6 overflow-y-auto">
            <div className="flex text-2xl font-montserrat font-medium">
                Implement subject:
                <p className="font-bold ml-3 text-[#4dad8c]">{subject.name}</p>
                <TiDelete onClick={handleCloseModal} className="size-7 ml-auto cursor-pointer" />
            </div>
            <div className="border-[1px] border-b-gray-400"></div>
            <div className="flex justify-center text-xl ">
                <p className="p-3 border rounded-lg">{subject.name}</p>
            </div>

            <div className="flex flex-col-4 mx-5 gap-x-5 justify-center">
                {skills.map((skill) =>
                    skill.parentSkill === null ? (
                        <div key={skill.id} className="p-3 border rounded-lg">
                            {skill.name}
                        </div>
                    ) : null)
                }
            </div>

            <div className="flex text-lg font-montserrat mt-4 gap-x-6">
                <div className="font-bold">Name:</div>
                <input type="text" className="border-2 p-1 border-black h-8" value={inputName} onChange={handleNameChange}  />
            </div>

            <div className="flex text-lg font-montserrat font-bold mt-4">
                Group:
                <div className="relative ml-5 w-56 font-medium">
                    <select className="w-full border-2 p-1 border-black max-h-40 overflow-auto" value={selectedGroup} onChange={handleGroupChange}>
                        <option value=""></option>
                        {groups.map((group, index) => (
                            <option key={index} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <table className="w-full font-montserrat font-bold border-collapse border-b border-gray-300">
                <thead>
                    <tr className="text-left">
                        <th className="py-2 pr-14">Skill</th>
                        <th className="px-4 py-2">Indicator</th>
                        <th className="px-4 py-2">Scale_min</th>
                        <th className="px-4 py-2">Scale_max</th>
                        <th className="px-4 py-2">Evaluation_type</th>
                        <th className="px-4 py-2">Start_value</th>
                        <th className="px-4 py-2">Objective_value</th>
                        <th className="px-4 py-2">Start_date</th>
                        <th className="px-4 py-2">End_date</th>
                    </tr>
                </thead>
            </table>

            <div>
                {indicators.map(indicator => (
                    <div key={indicator.id} className="grid grid-cols-9 font-montserrat mb-3">
                        <div>{indicator.skillName}</div>
                        <div>{indicator.name}</div>
                        <div>{indicator.scale_min}</div>
                        <div>{indicator.scale_max}</div>
                        <div>{indicator.evaluation_type}</div>
                        <div>
                            <input
                                type="number"
                                className="border border-black p-1 w-20"
                                name="start_value"
                                value={objectives.find(obj => obj.indicator_id === indicator.id)?.start_value || ""}
                                onChange={(e) => handleChange(e, indicator.id)}
                            />
                        </div>
                        <div>
                            <input
                                type="number"
                                className="border border-black p-1 w-20"
                                name="objective_value"
                                value={objectives.find(obj => obj.indicator_id === indicator.id)?.objective_value || ""}
                                onChange={(e) => handleChange(e, indicator.id)}
                            />
                        </div>
                        <div>
                            <input
                                type="date"
                                className="border border-black p-1 w-[120px]"
                                name="start_date"
                                value={objectives.find(obj => obj.indicator_id === indicator.id)?.start_date || ""}
                                onChange={(e) => handleChange(e, indicator.id)}
                            />
                        </div>
                        <div>
                            <input
                                type="date"
                                className="border border-black p-1 w-[120px]"
                                name="end_date"
                                value={objectives.find(obj => obj.indicator_id === indicator.id)?.end_date || ""}
                                onChange={(e) => handleChange(e, indicator.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end">
                <button onClick={handleSubmit} className="bg-green-600 text-white p-2 rounded mt-4">Submit</button>
            </div>
        </div>
    );
};
