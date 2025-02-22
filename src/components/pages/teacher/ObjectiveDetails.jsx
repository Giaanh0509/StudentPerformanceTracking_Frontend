import { IoIosAddCircle } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";
import { MdSpatialTracking } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useState, createContext, useEffect } from "react";
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { Link, useSearchParams } from 'react-router-dom';

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
            axios.get(`http://localhost:8080/objectives`)
                .then(response => {
                    {
                        console.log(response);
                        response.data._embedded.objectives.map(objective => {
                            if (objective.id == id) {
                                setObjective(objective)
                            }
                        })
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        };

        fetchData();

    }, [])
    
    return(
        <div className="flex flex-col h-full bg-white m-8 p-3 rounded-lg">
            <div className="flex">
                <div className="text-2xl px-8 py-4 font-montserrat font-semibold text-[#046b49]">
                    Manage Objectives / {objective.name}
                </div>
            </div>
        </div>
    )
}