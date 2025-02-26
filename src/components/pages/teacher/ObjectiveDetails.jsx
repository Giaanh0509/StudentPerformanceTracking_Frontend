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
import { FaChevronDown } from 'react-icons/fa';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { Tracking } from "./Tracking";

export const ObjectiveDetails = () => {

    const { id } = useParams();

    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    });

    const [indicators, setIndicators] = useState();
    const [trackingPopup, setTrackingPopup] = useState(false);

    const handleTrackingPopup = () => {
        setTrackingPopup(true);
    }

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const [objective, setObjective] = useState({
        id: "",
        name: "",
        subject: "",
        group: "",
        createDate: "",
        indicatorDTOList: []
    }
    );

    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            setTrackingPopup(false);
        }
    }

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

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/teacher/objectives');
    };

    console.log(objective.indicatorDTOList);

    return (
        <div className="flex flex-col h-full bg-white m-8 p-3 rounded-lg">
            <div className="flex">
                <button
                    onClick={handleGoBack}
                    className="flex items-center text-[#046b49] hover:text-[#034d36]"
                >
                    <AiOutlineArrowLeft className="text-2xl" />
                </button>

                <div className="text-xl px-3 py-4 font-montserrat font-semibold text-[#046b49]">
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

            <div className="flex justify-between mb-3 mr-3 text-sm">
                <div className="mt-3 ml-7 mr-auto">
                    <div className="flex p-[8px] border-[1px] rounded-lg w-44 border-[#7fa195]" name="" id="">
                        Number of trackings: <p className="ml-2 font-bold"></p>
                    </div>
                </div>
                <div className="flex items-center gap-x-2 p-2 bg-gradient-to-t rounded-lg from-[#8dbaaa] to-[#14ce90] ml-3 my-3 text-white">
                    <IoIosAddCircle className="size-5" />
                    <button onClick={handleTrackingPopup} className="font-montserrat font-medium">
                        New Tracking
                    </button>
                </div>
            </div>

            <div className="px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 text-white items-center rounded-lg bg-neutral-500 ">
                <div className="flex justify-between items-center font-montserrat font-bold ">
                    <div className="col-span-1">
                        Phase 2:
                        <div className="text-[#348a6c]"></div>
                    </div>
                    <div className="-rotate-90"><FaAngleDown></FaAngleDown></div>
                </div>
            </div>

            <div className={`px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 bg-neutral-500 items-center duration-500 text-white ${isOpen ? 'rounded-t-lg' : 'rounded-lg'}`}>
                <div className="flex justify-between items-center font-montserrat font-bold ">
                    <div className="col-span-1">
                        Phase 1:
                        <div className="text-[#348a6c]"></div>
                    </div>
                    <button onClick={toggleDropdown}>
                        <div className={`-rotate-90 transition-transform duration-300 ${isOpen ? 'rotate-0' : ''}`}><FaAngleDown></FaAngleDown></div>
                    </button>
                </div>
            </div>

            <div className="relative inline-block ml-7 mr-3">

                <div
                    className={`transition-all duration-500 ease-out transform origin-top-right absolute left-0 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}
                >
                    <div className="" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <div className="flex flex-col h-auto gap-y-2 py-2 px-4 pb-3 bg-neutral-200">
                            {objective.indicatorDTOList.map((indicator) => (
                                <div className="text-lg">{indicator.skillName}</div>
                            )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            { trackingPopup && (
                <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <Tracking></Tracking>
                </div>
            )}


        </div>
    )
}