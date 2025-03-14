import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { MdSpatialTracking } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, createContext, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from 'react-router-dom';
import { DeleteObjective } from "./DeleteObjective";

export const deleteObjectiveContext = createContext();

export const Objectives = () => {

    const [objectives, setObjectives] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    });

    const [deletePopup, setDeletePopup] = useState(false);
    const [selectedObjectiveId, setSelectedObjectiveId] = useState(null);

    const hanldeDeletePopup = (objectiveId) => {
        setSelectedObjectiveId(objectiveId);
        setDeletePopup(true);
    }

    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            setDeletePopup(false);
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
            setLoading(true);
            axios.get(`http://localhost:8080/objectives/userId=${userInfo.id}`)
                .then(response => setObjectives(response.data || []))
                .catch(error => console.error("Error fetching objectives:", error));

            setLoading(false);
        }

    }, [userInfo]);

    return (
        <div className="flex flex-col h-[640px] bg-white mx-6 mt-4 p-3 rounded-lg shadow-lg shadow-slate-400">
            <div className="flex">
                <div className="text-2xl px-8 py-4 font-montserrat font-semibold">
                    Manage Objectives
                </div>
            </div>

            <div className="flex justify-between mb-3">
                <div className="mt-3 ml-7 mr-auto">
                    <div className="p-[8px] border-[1px] rounded-lg w-52 border-[#7fa195]" name="" id="">
                        Number of objectives: <span className="font-bold ml-2">{objectives.length}</span>
                    </div>
                </div>
                <div className="mt-3">
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for objectives" />
                </div>

            </div>

            <div className="px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 rounded-md bg-neutral-200 items-center">
                <div className="grid grid-cols-5 font-montserrat font-bold ">
                    <div className="col-span-1">
                        Name
                    </div>

                    <div>
                        Subject
                    </div>

                    <div>
                        Group
                    </div>

                    <div>
                        Create Date
                    </div>

                    <div>

                    </div>
                </div>
            </div>

            {!loading && (
                <div>
                    {objectives.map((objective) => (
                        <div>
                            <Link to={`/teacher/objectives/${objective.id}`}>
                            <div key={objective.id} className="grid grid-cols-5 p-4 ml-7 gap-x-3 mr-3 font-montserrat items-center font-meidum hover:bg-slate-100">
                                <div className="col-span-1">
                                    {objective.name}
                                </div>
                                <div>
                                    {objective.subject}
                                </div>

                                <div>
                                    {objective.group}
                                </div>

                                <div>
                                    {objective.createDate}
                                </div>

                                <div onClick={(e) => {
                                    e.preventDefault();
                                }}
                                    className="flex gap-x-2" >
                                    <button onClick={() => {hanldeDeletePopup(objective.id)}} className="bg-[#a30303] p-2 rounded-md text-white"><MdDelete /></button>
                                </div>
                            </div>
                            <div className="ml-7 gap-x-3 mr-3 border-[1px] border-b-gray-200"></div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}

            {deletePopup && (
                <deleteObjectiveContext.Provider value={{ selectedObjectiveId, setDeletePopup }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 flex justify-center items-center z-50">
                        <DeleteObjective></DeleteObjective>
                    </div>
                </deleteObjectiveContext.Provider>
            )}

        </div>
    )
}