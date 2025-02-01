import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { modalContext } from "./SubjectTeacher";

export const SubjectImpl = () => {

    const { selectedSubjectId } = useContext(modalContext);

    const [subject, setSubject] = useState([]);
    const [groups, setGroups] = useState([]);
    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    });

    const [selectedSkillId, setSelectedSkillId] = useState(null);

    const handleSkillClick = (skillId) => {
        setSelectedSkillId(skillId);
    };

    const [skills, setSkills] = useState([]);

    const [skillIndicator, setSkillIndicator] = useState([]);

    const [indicators, setIndicators] = useState([]);

    const handleCloseModal = () => { };

    useEffect(() => {
        const storedUserLoginDTO = localStorage.getItem("userLoginDTO");

        if (storedUserLoginDTO) {
            try {
                const userLoginDTO = JSON.parse(storedUserLoginDTO);
                setUserInfo(userLoginDTO);
            } catch (e) {
                console.error("Error parsing userLoginDTO from localStorage:", e);
            }
        } else {
            console.log("No user info found in localStorage");
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            if (userInfo.id) {
                axios
                    .get(`http://localhost:8080/groups/userId=${userInfo.id}`)
                    .then((response) => {
                        const fetchedGroups = response.data || [];
                        setGroups(fetchedGroups);
                    })
                    .catch((error) => {
                        console.error("There was an error!", error);
                    });
            }
        };

        fetchData();
    }, [userInfo]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/subjects/subjectId=${selectedSubjectId}`);
                if (response.data) {
                    const fetchedData = response.data;
                    setSubject(fetchedData);
                }
            } catch (error) {
                console.error("There was an error fetching the subject!", error);
            }
        };

        fetchData();
    }, [selectedSubjectId]);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const response = await axios.get(`http://localhost:8080/subjects/${selectedSubjectId}/skills`);
                const skillsData = response.data._embedded?.skills || [];

                const childrenSkill = skillsData.filter(skill => skill.childrenSkill == false);
                setSkillIndicator(childrenSkill);

                setSkills(skillsData);
            } catch (error) {
                console.log(error);
            }

        };

        fetchData();

    }, [])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responses = await Promise.all(
                    skillIndicator.map(async (skill) => {
                        const response = await axios.get(`http://localhost:8080/indicators/skillId=${skill.id}`);
                        return response.data;
                    })
                );
    
                setIndicators(responses);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
    
        if (skillIndicator.length > 0) {
            fetchData();
        }
    }, [skillIndicator]);
    
    return (
        <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg w-[750px] h-3/4">
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
            <div className="flex text-lg font-montserrat font-bold mt-4">
                Group:
                <div className="relative ml-5 w-56 font-medium">
                    <select className="w-full border-2 p-2 border-black max-h-40 overflow-auto">
                        <option value=""></option>
                        {groups.map((group, index) => (
                            <option key={index} value={group.id}>
                                {group.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-col-4 mx-5 gap-x-5 justify-center">
                <div className="flex flex-col">
                {indicators.map((indicator) => (
                    <div className="flex gap-x-5">
                        <div>
                            {indicator.name}
                        </div>
                        <div>
                            {indicator.scale_min}
                        </div>
                        <div>
                            {indicator.scale_max}
                        </div>
                    </div>
                ))
                }
                </div>
            </div>
        </div>
    );
};
