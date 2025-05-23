import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { modalContext } from "./SubjectTeacher";
import ReactFlow, { MiniMap, Controls, Background } from "reactflow";
import "reactflow/dist/style.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CustomDropdown } from "./CustomDropdown";

export const SubjectImpl = ({ onSuccessCreate }) => {

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
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");


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

    const formatDate = () => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    };

    const handleSubmit = async () => {
        try {
            const dataToSend = {
                group_id: selectedGroup,
                objectiveName: inputName,
                user_id: userInfo.id,
                subject_id: selectedSubjectId,
                createDate: formatDate(),
                start_date: startDate,
                end_date: endDate,
                objectives: objectives,
            };

            await axios.post("https://studentperformancetrackingbackend-production.up.railway.app/objectives/new", dataToSend);
            setShowModal(false);
            onSuccessCreate && onSuccessCreate();
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
            axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/groups/userId=${userInfo.id}`)
                .then(response => setGroups(response.data || []))
                .catch(error => console.error("Error fetching groups:", error));
        }
    }, [userInfo]);

    useEffect(() => {
        axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/subjects/subjectId=${selectedSubjectId}`)
            .then(response => response.data && setSubject(response.data))
            .catch(error => console.error("Error fetching subject:", error));
    }, [selectedSubjectId]);

    useEffect(() => {
        axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/subjects/${selectedSubjectId}/skills`)
            .then(response => {
                const skillsData = response.data._embedded?.skills || [];
                setSkillIndicator(skillsData.filter(skill => skill.childrenSkill === false));
                setSkills(skillsData);
            })
            .catch(error => console.log(error));
    }, [selectedSubjectId]);

    const calculateSkillLevels = (skills) => {
        const levels = {};
        const maxLevel = 5;

        for (let level = 0; level < maxLevel; level++) {
            skills.forEach(skill => {
                if (skill.parentSkill === null) {
                    levels[skill.id] = 0;
                } else if (levels[skill.parentSkill.id] !== undefined) {
                    levels[skill.id] = levels[skill.parentSkill.id] + 1;
                }
            });
        }

        return levels;
    };

    const generateNodesAndEdges = () => {
        const nodes = [];
        const edges = [];
        const skillLevels = calculateSkillLevels(skills);

        const levelColumns = {};

        nodes.push({
            id: `subject-${selectedSubjectId}`,
            type: "input",
            data: { label: subject.name },
            position: { x: 400, y: 50 }
        });

        skills.forEach((skill) => {
            const level = skillLevels[skill.id] || 0;
            if (!levelColumns[level]) levelColumns[level] = 0;

            nodes.push({
                id: `skill-${skill.id}`,
                data: { label: skill.name },
                position: { x: 200 + levelColumns[level] * 200, y: 150 + level * 150 }
            });

            levelColumns[level] += 1;

            if (skill.parentSkill) {
                edges.push({
                    id: `edge-${skill.parentSkill.id}-${skill.id}`,
                    source: `skill-${skill.parentSkill.id}`,
                    target: `skill-${skill.id}`,
                    animated: true,
                });
            } else {
                edges.push({
                    id: `edge-${selectedSubjectId}-${skill.id}`,
                    source: `subject-${selectedSubjectId}`,
                    target: `skill-${skill.id}`,
                    animated: true,
                });
            }
        });

        return { nodes, edges };
    };

    const { nodes, edges } = generateNodesAndEdges();

    useEffect(() => {
        if (skillIndicator.length > 0) {
            Promise.all(skillIndicator.map(skill => axios.get(`https://studentperformancetrackingbackend-production.up.railway.app/indicators/skillId=${skill.id}`)))
                .then(responses => setIndicators(responses.map(res => res.data)))
                .catch(error => console.error("Fetch error:", error));
        }
    }, [skillIndicator]);

    console.log(objectives);

    return (
        <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg w-[1200px] h-5/6 overflow-y-auto font-montserrat">
            <div className="flex text-xl font-medium">
                Implement subject:
                <p className="font-bold ml-3 text-[#4dad8c]">{subject.name}</p>
                <TiDelete onClick={handleCloseModal} className="size-7 ml-auto cursor-pointer" />
            </div>
            <div className="border-[1px] border-b-gray-400"></div>

            <div className="flex flex-col w-full">
                <div className="relative w-full h-[300px] overflow-hidden border-2 border-gray-400 rounded-lg">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodesConnectable={false}
                        nodesDraggable={false}
                        fitView
                        fitViewOptions={{ padding: 0.2 }}
                        minZoom={0.2}
                        maxZoom={1.5}
                        style={{ width: '100%', height: '100%' }}
                    >
                        <MiniMap />
                        <Controls />
                        <Background />
                    </ReactFlow>
                </div>

                <div className="flex flex-col overflow-auto mt-8">
                    <div className="flex text-lg font-montserrat gap-x-6 justify-between">
                        <div className="flex flex-col gap-y-3">
                            <div className="font-bold">Name:</div>
                            <input type="text" className="border-2 p-1 w-72 border-zinc-300 h-10 rounded-lg" value={inputName} onChange={handleNameChange} />
                        </div>

                        <CustomDropdown
                            groups={groups}
                            selectedGroup={selectedGroup}
                            setSelectedGroup={setSelectedGroup}
                        />

                    </div>

                    <div className="flex flex-col gap-y-2 mt-3">
                        <div className="font-bold">Start Date:</div>
                        <input
                            type="date"
                            className="border-2 p-1 w-72 border-zinc-300 h-10 rounded-lg"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-y-1 mt-3">
                        <div className="font-bold">End Date:</div>
                        <input
                            type="date"
                            className="border-2 p-1 w-72 border-zinc-300 h-10 rounded-lg"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>

                    <div className="mt-3">
                        <div className="h-14 border p-2 bg-neutral-300  border-gray-300">
                            <div className="grid grid-cols-6 font-montserrat">
                                <div className="py-2">Skill</div>
                                <div className="py-2">Indicator</div>
                                <div className="py-2">Range</div>
                                <div className="py-2">Evaluation_type</div>
                                <div className="py-2">Start_value</div>
                                <div className="py-2">Objective_value</div>
                            </div>
                        </div>

                        <div className="h-auto border-x border-b p-2 border-gray-300 rounded">
                            <div className="flex flex-col p-1 gap-y-3">
                                {indicators.map(indicator => (
                                    <div key={indicator.id} className="grid grid-cols-6 font-montserrat mb-3 mt-4">
                                        <div>{indicator.skillName}</div>
                                        <div>{indicator.name}</div>
                                        <div>{indicator.scale_min} - {indicator.scale_max}</div>
                                        <div>{indicator.evaluation_type}</div>
                                        <div>
                                            <input
                                                type="number"
                                                className="border border-black p-1 w-20 rounded-md"
                                                name="start_value"
                                                value={objectives.find(obj => obj.indicator_id === indicator.id)?.start_value || ""}
                                                onChange={(e) => handleChange(e, indicator.id)}
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="number"
                                                className="border border-black p-1 w-20 rounded-md"
                                                name="objective_value"
                                                value={objectives.find(obj => obj.indicator_id === indicator.id)?.objective_value || ""}
                                                onChange={(e) => handleChange(e, indicator.id)}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>


                    </div>






                </div>
            </div>

            <div className="flex  p-2 mt-5 text-white justify-center bg-gradient-to-l from-[#4df1bb] to-[#1c8764]  rounded-lg">
                <button onClick={handleSubmit}>Submit</button>
            </div>

        </div>

    );
};
