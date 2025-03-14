import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { MdSpatialTracking } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, createContext, useEffect, useRef } from "react";
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { Link, useSearchParams } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { FaChevronDown } from 'react-icons/fa';
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import { Tracking } from "./Tracking";
import { NewTracking } from "./NewTracking";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { RiArrowRightWideFill, RiArrowLeftWideFill } from "react-icons/ri";
import { TiDeleteOutline } from "react-icons/ti";
import { useSpring, animated } from 'react-spring';
import { EditTracking } from "./EditTracking";


export const trackingContext = createContext();
export const createTrackingContext = createContext();

export const ObjectiveDetails = () => {

    const containerRef = useRef(null);

    const { id } = useParams();

    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    });

    const [loading, setLoading] = useState(true);


    const [indicator, setIndicator] = useState();
    const [createTrackingPopup, setCreateTrackingPopup] = useState(false);
    const [trackingPopup, setTrackingPopup] = useState(false);
    const [trackings, setTrackings] = useState([]);

    const handleCreateTrackingPopup = () => {
        setCreateTrackingPopup(true);
    }

    const [isOpen, setIsOpen] = useState(true);

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

    const [trackingId, setTrackingId] = useState(0);

    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            setTrackingPopup(false);
            setCreateTrackingPopup(false);
        }
    }

    const seletedSkill = (indicator, trackingId) => {
        setIndicator(indicator);
        setTrackingId(trackingId);
        setTrackingPopup(true);
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

    }, [id])

    useEffect(() => {
        const fetchData = async () => {
            if (id != 0) {
                setLoading(true);
                axios.get(`http://localhost:8080/trackings/objectiveId=${id}`)
                    .then(response => {
                        {
                            const fetchedSubjects = response.data || [];
                            setTrackings(fetchedSubjects);
                        }
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });

                setLoading(false)
            }


        };

        fetchData();

    }, [trackings, id])

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/teacher/objectives');
    };

    const truncateText = (text, maxLength) => {
        if (!text || typeof text !== 'string') return '';
        return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    const [currentIndex, setCurrentIndex] = useState(0);
    const itemsToShow = trackings.slice(currentIndex, currentIndex + 4);

    const scrollProps = useSpring({
        opacity: 1,
        transform: `translateX(-${currentIndex * 260}px)`,
        config: { friction: 30, tension: 200 },
    });

    const scrollLeft = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const scrollRight = () => {
        if (currentIndex + 4 < trackings.length) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const [checkedStates, setCheckedStates] = useState({});

    const handleCheckboxChange = (trackingId, indicatorId, isChecked) => {
        setCheckedStates(prevState => ({
            ...prevState,
            [`${trackingId}-${indicatorId}`]: isChecked
        }));
    };

    const checkTrackingIndicatorExists = async (trackingId, indicatorId) => {
        try {
            const response = await axios.get(`http://localhost:8080/trackings/${trackingId}/indicators/${indicatorId}/exists`);
            return response.data; 
        } catch (error) {
            console.error(`Error checking indicator ${indicatorId} for tracking ${trackingId}`, error);
            return false;
        }
    };

    const loadInitialCheckboxStates = async () => {
        const newCheckedStates = {};
    
        for (const tracking of trackings) {
            for (const indicator of objective.indicatorDTOList) {
                const exists = await checkTrackingIndicatorExists(tracking.id, indicator.id);
                newCheckedStates[`${tracking.id}-${indicator.id}`] = exists;
            }
        }
    
        setCheckedStates(newCheckedStates);
    };

    useEffect(() => {
        if (trackings.length > 0 && objective.indicatorDTOList.length > 0) {
            loadInitialCheckboxStates();
        }
    }, [trackings, objective.indicatorDTOList]);

    return (
        <div className="flex flex-col h-[640px] bg-white mx-6 mt-4 p-3 rounded-lg shadow-lg overflow-y-auto shadow-slate-400">
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
                <div className='w-1/2 h-auto bg-neutral-200 my-5 py-3 px-4 gap-y-5 rounded-xl shadow-lg'>
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
                        Number of trackings: <p className="ml-2 font-bold">{trackings.length}</p>
                    </div>
                </div>
                <div className="flex items-center gap-x-2 p-2 bg-gradient-to-t rounded-lg from-[#8dbaaa] to-[#14ce90] ml-3 my-3 text-white shadow-lg">
                    <IoIosAddCircle className="size-5" />
                    <button onClick={handleCreateTrackingPopup} className="font-montserrat font-medium">
                        New Tracking
                    </button>
                </div>
            </div>

            {!loading && (
                <div className="flex w-full justify-center items-center mt-7">
                    <RiArrowLeftWideFill size={60} className="mt-2 mr-4 cursor-pointer" onClick={scrollLeft} />

                    <div className="flex overflow-x-auto gap-x-5 scroll-smooth w-full no-scrollbar whitespace-nowrap">
                        {itemsToShow.map((tracking, index) => {
                            const phaseNumber = currentIndex + index + 1;

                            return (
                                <div key={index} className="flex flex-col min-w-[250px] mx-2 rounded-lg">
                                    <div className={`px-4 py-3 w-[250px] bg-[#348a6c] text-white rounded-t-lg`}>
                                        <div className="flex justify-between items-center font-montserrat font-bold ">
                                            <div>
                                                <div>{truncateText(tracking.name, 18)} </div>
                                            </div>
                                            <div><TiDeleteOutline size={28}/></div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col w-[250px] text-xs font-montserrat h-auto gap-y-2 py-2 px-4 bg-neutral-200 shadow-lg rounded-b-lg">
                                        {objective.indicatorDTOList.map((indicator, index) => {
                                            const uniqueCheckboxId = `check-${tracking.id}-${indicator.id}`;
                                            const isChecked = checkedStates[`${tracking.id}-${indicator.id}`] || false;

                                            return (
                                                <div className="flex justify-between" key={indicator.id}>
                                                    <div onClick={() => { seletedSkill(indicator, tracking.id) }} className="text-lg tex-white hover:text-[#348a6c] cursor-pointer">{indicator.skillName}</div>
                                                    <div className="inline-flex items-center">
                                                        <label className="flex items-center cursor-pointer relative">
                                                            <input
                                                                type="checkbox"
                                                                className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-teal-600 checked:border-teal-600"
                                                                id={uniqueCheckboxId}
                                                                checked={checkedStates[`${tracking.id}-${indicator.id}`] || false}
                                                                onChange={(e) => handleCheckboxChange(tracking.id, indicator.id, e.target.checked)}
                                                            />
                                                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="1">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                                                                </svg>
                                                            </span>
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <RiArrowRightWideFill size={60} className="mt-2 cursor-pointer" onClick={scrollRight} />
                </div>
            )}

            {trackingPopup && (
                <trackingContext.Provider value={{ id, setTrackingPopup, indicator, trackingId }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        {checkedStates[`${trackingId}-${indicator.id}`] ? (
                            <EditTracking />
                        ) : (
                            <Tracking />
                        )}
                    </div>
                </trackingContext.Provider>
            )}


            {createTrackingPopup && (
                <createTrackingContext.Provider value={{ id, setCreateTrackingPopup, setTrackings }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <NewTracking></NewTracking>
                    </div>
                </createTrackingContext.Provider>
            )}

        </div>
    )
}