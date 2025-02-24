import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { MdSpatialTracking } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, createContext, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { Link, useSearchParams } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";

export const ObjectiveDetails = () => {

    const { id } = useParams();

    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    });

    const [objective, setObjective] = useState({
        id: "",
        name: "",
        subject: "",
        group: "",
        createDate: ""
    }
    );

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
        const fetchData = async () => {
            axios.get(`http://localhost:8080/objectives/objectiveId=${id}`)
                .then(response => {
                    {   
                        setObjective(response.data)
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        };

        fetchData();

    }, [])
    
    console.log(objective);
    
    return(
        <div className="flex flex-col h-full bg-white m-8 p-3 rounded-lg">
            <div className="flex">
                <div className="text-2xl px-8 py-4 font-montserrat font-semibold text-[#046b49]">
                    Manage Objectives / {objective.name}
                </div>
            </div>

            <div className='flex justify-between ml-8 mr-3'>
                <div className='w-1/2 h-auto bg-neutral-200 my-5 py-3 px-4 gap-y-5 rounded-xl'>
                    <div className='text-lg flex items-center gap-x-4 font-montserrat font-bold mb-3'>Infomation
                        <button> <CiEdit></CiEdit> </button>
                    </div>

                    <div className='flex font-medium justify-between mr-[70px] mb-3'>
                        <div className='flex gap-x-7'>Name:<div className='text-[#348a6c]'>
                            {objective.name}
                        </div>
                        </div>

                        <div className='flex gap-x-3'>Create Date:<div className='text-[#348a6c]'>
                        {objective.createDate}
                        </div>
                        </div>
                    </div>

                    <div className='flex font-medium justify-between mr-[75px] mb-3'>
                        <div className='flex gap-x-5'>Subject:<div className='text-[#348a6c]'>
                        {objective.subject}
                        </div>
                        </div>
                    </div>

                    <div className='flex font-medium justify-between mr-[75px] mb-3'>
                        <div className='flex gap-x-7'>Group:<div className='text-[#348a6c]'>
                        {objective.group}
                        </div>
                        </div>
                    </div>

                </div>
            </div>

            <div className="px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 rounded-md bg-neutral-200 items-center">
                <div className="flex justify-between items-center font-montserrat font-bold ">
                    <div className="col-span-1">
                        Phase 1:
                        <div className="text-[#348a6c]"></div>
                    </div>
                    <div className="-rotate-90"><FaAngleDown></FaAngleDown></div>
                </div>
            </div>
        </div>
    )
}