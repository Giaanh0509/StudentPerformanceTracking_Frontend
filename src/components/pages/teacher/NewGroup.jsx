import { useState, useContext, useEffect } from "react";
import StudentService from "../../../services/StudentService";
import { TiDelete } from "react-icons/ti";
import { modalContext } from "./Group"
import GroupService from "../../../services/GroupService";

export const NewGroup = () => {

    const { showModal, setShowModal } = useContext(modalContext);
    const { groups, setGroups } = useContext(modalContext);

    const [group, setGroup] = useState({
        id: "",
        name: "",
        description: "",
        currentDate: "",
        userId: ""
    });

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setGroup({ ...group, [e.target.name]: value });
    }

    useEffect(() => {
        const userLoginDTO = localStorage.getItem('userLoginDTO');
        if (userLoginDTO) {
            try {
                const user = JSON.parse(userLoginDTO);

                const currentDate = new Date().toISOString().split('T')[0];
                setGroup((prevGroup) => ({
                    ...prevGroup,
                    userId: user.id,
                    createDate: currentDate
                }));
            } catch (error) {
                console.error("Error parsing userLoginDTO from localStorage:", error);
            }
        }
    }, []);

    const saveGroup = (e) => {
        e.preventDefault();
    
        GroupService.saveGroup(group)
            .then((response) => {
                setGroups((prevGroups) => [...prevGroups, response.data]);  
                setShowModal(false);
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div>
            <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg w-[750px] h-2/3">
                <div className="flex justify-between">
                    <div className="font-bold text-xl">Create new group</div>
                    <TiDelete onClick={handleCloseModal} className="size-7" />
                </div>
                <div className="border-[1px] border-b-gray-400"></div>
                <div className="flex justify-between gap-x-5">
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={group.name}
                        onChange={(e) => handleChange(e)}
                        className="border-2 p-2 w-80 mr-64" />
                </div>

                <div className="flex justify-between gap-x-5">
                    Decription:
                    <input
                        type="text"
                        name="description"
                        value={group.description}
                        onChange={(e) => handleChange(e)}
                        className="border-2 p-2 w-80 mr-64" />
                </div>

                <div className="flex justify-end">
                    <button onClick={saveGroup} className="bg-gradient-to-l from-[#4df1bb] to-[#1c8764] py-2 px-4 rounded-lg">Create</button>
                </div>
            </div>
        </div>
    )
}