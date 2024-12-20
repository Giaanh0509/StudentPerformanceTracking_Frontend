import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { useState, createContext, useEffect } from "react";
import { NewStudent } from "./NewStudent";
import axios from "axios";
import { Link } from 'react-router-dom';
import { NewGroup } from "./NewGroup";

export const modalContext = createContext();

export const Group = () => {

    const [groups, setGroups] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
    }  
    );

    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            setShowModal(false);
        }
    };

    const handleButton = () => {
        setShowModal(true);
    };

    useEffect(() => {
        const storedUserLoginDTO = localStorage.getItem('userLoginDTO');
    
        if (storedUserLoginDTO) {
            try {
                const userLoginDTO = JSON.parse(storedUserLoginDTO);

                setUserInfo(userLoginDTO);
            } catch (e) {
                console.error('Error parsing userLoginDTO from localStorage:', e);
            }
        } else {
            console.log('No user info found in localStorage');
        }
    }, []); 

    useEffect(() => {
        const fetchData = async () => {
            if(userInfo.id != 0) {
                setLoading(true);

                axios.get(`http://localhost:8080/groups/userId=${userInfo.id}`)
                .then(response => {
                    {  
                       const fetchedSubjects = response.data || [];
                       console.log(fetchedSubjects);
                       setGroups(response.data);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });

                setLoading(false)
            }
        };

        fetchData();

    }, [userInfo])
    
    return(
        <div className="flex flex-col h-full bg-white m-8 p-3">
            <div className="flex">
                <div className="text-3xl px-8 py-4 font-montserrat font-semibold">
                    Groups
                </div>
            </div>

            <div className="flex justify-between mb-3">
                <div className="mt-3 ml-7 mr-auto">
                    <select className="p-[8px] border-[1px] rounded-lg w-44 border-[#7fa195]" name="" id="">
                        <option value="all">Slect all groups</option>
                        <option value="myself">Select my groups</option>
                    </select>
                </div>
                <div className="mt-3">
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for students" />
                </div>
                <div className="flex items-center gap-x-2 p-2 bg-gradient-to-t rounded-lg from-[#8dbaaa] to-[#14ce90] m-3 text-white">
                    <IoIosAddCircle className="size-5" />
                    <button onClick={handleButton} className="text-base font-montserrat font-medium">
                        Create New Group
                    </button>
                </div>
            </div>

            {!loading && (
                <div>
                    {groups.map((group) => (
                        <Link to={`/teacher/groups/${group.id}`}>
                            <div key={group.id} className="flex p-4 ml-7 gap-x-3 mt-3 mr-3 bg-neutral-200 items-center">
                                <FaAngleDown className="-rotate-90" />
                                <div className="font-montserrat font-semibold">
                                    {group.name}
                                </div>
                            </div>
                        </Link>    
                    ))}
                </div>
            )}

            {showModal && (
                <modalContext.Provider value={{showModal, setShowModal, groups, setGroups}}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <NewGroup></NewGroup>
                    </div>
                </modalContext.Provider>
            )}
        </div>
    )
}