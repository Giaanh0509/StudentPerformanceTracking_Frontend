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


    return(
        <div className="flex flex-col max-h-[665px] overflow-y-auto">
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