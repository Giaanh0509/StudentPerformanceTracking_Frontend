import { useState, useContext, useEffect } from "react";
import StudentService from "../../../services/StudentService";
import { TiDelete } from "react-icons/ti";
import { modalContext } from "./Group"
import GroupService from "../../../services/GroupService";

export const NewGroup = ({ onSuccessCreate }) => {

    const { showModal, setShowModal } = useContext(modalContext);
    const { groups, setGroups } = useContext(modalContext);
    const { render, setRender } = useContext(modalContext);


    const [group, setGroup] = useState({
        id: "",
        name: "",
        description: "",
        currentDate: "",
        userId: ""
    });

    const [errors, setErrors] = useState({ name: false, description: false });

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGroup({ ...group, [name]: value });

        setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
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

        let newErrors = {
            name: !group.name,
            description: !group.description
        };
        setErrors(newErrors);

        if (newErrors.name || newErrors.description) return;

        GroupService.saveGroup(group)
            .then((response) => {
                setGroups((prevGroups) => [...prevGroups, response.data]);
                setRender(render+1);
                setShowModal(false);
                onSuccessCreate && onSuccessCreate();
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div>
            <div className="flex flex-col gap-y-4 bg-white font-montserrat p-4 rounded-lg w-[500px] h-2/3">
                <div className="flex justify-between">
                    <h2 className="font-bold text-2xl text-[#03966c]">Create New Group</h2>
                    <button onClick={handleCloseModal} className="text-gray-600 hover:text-red-500 transition text-2xl">
                        <TiDelete className="size-7" />
                    </button>
                </div>
                <div className="border-[1px] border-b-gray-400"></div>

                <div className="flex flex-col gap-1">
                    <span className="font-semibold">Name:</span>
                    <input
                        type="text"
                        name="name"
                        value={group.name}
                        onChange={(e) => handleChange(e)}
                        placeholder="Enter subject name"
                        className={`border-2 p-2 w-full rounded-lg ${errors.name ? "border-red-500 focus:ring-red-500" : ""
                            }`} />
                </div>

                <div className="flex flex-col gap-1">
                    <span className="font-semibold">Decription:</span>
                    <textarea
                        name="description"
                        value={group.description}
                        onChange={handleChange}
                        placeholder="Enter subject description"
                        className={`border-2 p-2 w-full rounded-lg resize-none ${errors.description ? "border-red-500 focus:ring-red-500" : ""
                            }`}
                        rows="3"
                    ></textarea>
                </div>
                
                <div className="flex justify-center bg-gradient-to-l from-[#4df1bb] to-[#1c8764]  rounded-lg">
                    <button onClick={saveGroup} className="py-2 px-4 text-white">Create</button>
                </div>
            </div>
        </div>
    )
}