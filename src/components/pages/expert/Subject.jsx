import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { NewSubject } from "./NewSubject";
import { useState, createContext, useEffect } from "react";
import { Link } from 'react-router-dom';
import SubjectService from "../../../services/SubjectService";

export const modalContext = createContext();

export const Subject = () => {

    const [showModal, setShowModal] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleButton = () => {
        setShowModal(true);
    };

    const handleClickOutside = (event) => {
        if (event.target === event.currentTarget) {
            setShowModal(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            try {
                const response = await SubjectService.getAllSubjects();
                setSubjects(response.data._embedded.subjects);
            } catch (err) {
                console.log(err);
            }

            setLoading(false)
        };

        fetchData();

    }, [])

    return (
        <div className="flex flex-col h-full bg-white m-8 p-3">
            <div className="flex">
                <div className="text-3xl px-8 py-4 font-montserrat font-semibold">
                    Manage Subject
                </div>
            </div>
            <div className="flex justify-between mb-3">
                <div className="mt-3 ml-7 mr-auto">
                    <select className="p-[8px] border-[1px] rounded-lg w-44 border-[#7fa195]" name="" id="">
                        <option value="all">Slect all subjects</option>
                        <option value="myself">Select my subjects</option>
                    </select>
                </div>
                <div className="mt-3">
                    <input className="border-[1px] p-2 rounded-lg w-80 border-[#7fa195]" type="text" placeholder="Search for subjects" />
                </div>
                <div className="flex items-center gap-x-2 p-2 bg-gradient-to-t rounded-lg from-[#8dbaaa] to-[#14ce90] m-3 text-white">
                    <IoIosAddCircle className="size-5" />
                    <button onClick={handleButton} className="text-base font-montserrat font-medium">
                        Create New Subject
                    </button>
                </div>
            </div>

            {!loading && (
                <div>
                    {subjects.map((subject) => (
                        <Link to={`/subjects/id=${subject.id}`}>
                            <div key={subject.id} className="flex p-4 ml-7 gap-x-3 mt-3 mr-3 bg-neutral-200 items-center">
                                <FaAngleDown className="-rotate-90" />
                                <div className="font-montserrat font-semibold">
                                    {subject.name}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}



            {showModal && (
                <modalContext.Provider value={{ showModal, setShowModal, subjects, setSubjects }}>
                    <div onClick={handleClickOutside} className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <NewSubject></NewSubject>
                    </div>
                </modalContext.Provider>
            )}

        </div>
    )
}