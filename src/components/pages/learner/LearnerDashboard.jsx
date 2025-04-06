import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";
import { AddInformationStudent } from "./AddInformationStudent";

export const studentContext = createContext();

export const LearnerDashboard = () => {


    const [student, setStudent] = useState({});
    const [popUp, setPopup] = useState(false);

    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    }
    );

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
            if (userInfo.id != 0) {
                axios.get(`http://localhost:8080/students/userId=${userInfo.id}`)
                    .then(response => {
                        {
                            console.log(response.data);
                            setStudent(response.data);
                            if (!response.data.name) {
                                setPopup(true);
                            } else {
                                setPopup(false);
                            }
                        }
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
            }
        };
        fetchData();
    }, [userInfo])


    return (
        <div className="flex flex-col h-[640px] bg-white gap-y-4 mx-6 mt-4 p-3 rounded-lg shadow-lg shadow-slate-400">
            <div className="flex justify-between">
                <div className="mt-3 ml-7 mr-auto">
                    <p className="text-xl">Student Infomation</p>
                </div>
            </div>

            <div className="ml-7 border-[2px] border-b-gray-300"></div>

            <div className="flex ml-7 mt-2 gap-x-5">
                <div className="w-44 h-56 bg-black mr-20"></div>
                <div className="flex flex-col gap-y-3">
                    <div className="flex gap-x-24"> <p className="font-bold">Name:</p> <p>{student.name}</p> </div>
                    <div className="flex gap-x-10"> <p className="font-bold">Date of birth:</p> <p>{student.dateOfBirth}</p> </div>
                    <div className="flex gap-x-24"> <p className="font-bold">Email:</p> <p>{student.email}</p> </div>

                </div>
            </div>
            {popUp && (
                <studentContext.Provider value={{ studentId: student.id, setPopup }}>
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <AddInformationStudent></AddInformationStudent>
                    </div>
                </studentContext.Provider>
            )}
        </div>
    )
}