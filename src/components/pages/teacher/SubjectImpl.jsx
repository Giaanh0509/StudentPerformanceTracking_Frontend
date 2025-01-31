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
    
    const handleCloseModal = () => {};

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
                axios
                    .get(`http://localhost:8080/subjects/subjectId=${selectedSubjectId}`)
                    .then((response) => {
                        const fetchedData = response.data || [];
                        console.log(fetchedData);
                        setSubject(fetchedData);
                    })
                    .catch((error) => {
                        console.error("There was an error!", error);
                    });
        };

        fetchData();
    }, []);

    console.log(subject.name);

    return (
        <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg w-[750px] h-3/4">
            <div className="flex text-2xl font-montserrat font-medium">
                Implement subject:
                <p className="font-bold ml-3 text-[#4dad8c]">{subject.name}</p>
                <TiDelete onClick={handleCloseModal} className="size-7 ml-auto cursor-pointer" />
            </div>
            <div className="border-[1px] border-b-gray-400"></div>
            <div>

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
        </div>
    );
};
