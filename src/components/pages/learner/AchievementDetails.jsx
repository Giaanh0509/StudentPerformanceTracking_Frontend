import { useEffect, useContext, useState } from "react";
import { useParams, useLocation } from 'react-router-dom';
import axios from "axios";
import { Link, useSearchParams } from 'react-router-dom';

export const AchievementDetails = () => {

    const { id } = useParams();
    const [student, setStudent] = useState({});
    const [trackings, setTrackings] = useState([]);
    const [trackingDetails, setTrackingDetails] = useState([]);
    const [hoverTrackingId, setHoverTrackingId] = useState(null);

    useEffect(() => {
        {
            axios.get(`http://localhost:8080/trackings/objectiveId=${id}`)
                .then(response => setTrackings(response.data || []))
                .catch(error => console.error("Error fetching objectives:", error));
        }

    }, [id]);

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
                        }
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
            }
        };
        fetchData();
    }, [userInfo])

    useEffect(() => {
        if (student.id && trackings.length > 0) {
            const fetchAllTrackingDetails = async () => {
                const newDetails = [];

                for (const tracking of trackings) {
                    try {
                        const response = await axios.get(`http://localhost:8080/trackings/trackingId=${tracking.id}/studentId=${student.id}`);
                        newDetails.push(response.data);
                    } catch (error) {
                        console.error(`Error fetching detail for tracking ${tracking.id}:`, error);
                    }
                }

                setTrackingDetails(newDetails);
            };

            fetchAllTrackingDetails();
        }
    }, [student, trackings]);

    return (
        <div className="flex flex-col h-[640px] bg-white mx-6 mt-4 p-3 rounded-lg shadow-lg shadow-slate-400 overflow-y-auto">
            <div className="px-4 py-3 ml-7 gap-x-3 mt-3 mr-3 rounded-md bg-neutral-200 items-center">
                <div className="grid grid-cols-4 font-montserrat font-bold ">
                    <div className="">
                        Name
                    </div>

                    <div className="ml-[54px]">
                        Date
                    </div>

                    <div className="ml-[54px]">
                        Score
                    </div>

                    <div className="ml-[50px]">
                        Comment
                    </div>
                </div>
            </div>

            <div className="flex flex-col max-h-[450px]">
                {[...trackingDetails].reverse().map((tracking) => (
                    <Link className="" to={`/learner/achievement/${id}/score/${tracking.id}`}>
                        <div className="grid grid-cols-4 p-4 ml-7 gap-x-3 mr-3 items-center h-24 hover:bg-slate-100">
                            <div className="col-span-1 font-montserrat font-meidum">
                                {tracking.trackingName}
                            </div>

                            <div className="font-montserrat font-meidum ml-[50px]">
                                {tracking.trackingDate}
                            </div>

                            <div className="relative flex font-montserrat font-meidum ml-[64px]"
                                onMouseEnter={() => setHoverTrackingId(tracking.trackingId)}
                                onMouseLeave={() => setHoverTrackingId(null)}>
                                5

                                {hoverTrackingId === tracking.trackingId && (
                                    <div className="absolute top-0 left-10 z-10 bg-white border border-gray-300 shadow-lg rounded-md p-2 w-48 flex flex-col">
                                        {tracking.scoreDTOList && tracking.scoreDTOList.length > 0 ? (
                                            tracking.scoreDTOList.map((score, index) => (
                                                <div key={index} className="flex gap-x-3 text-sm text-gray-700 mb-1">
                                                    <strong>{score.skillName}:</strong> {score.value}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-sm text-gray-500">No score data</div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="ml-[50px]">
                                .....
                            </div>
                        </div>
                        <div className="ml-7 gap-x-3 mr-3 border-[1px] border-b-gray-200"></div>
                    </Link>
                ))}

                <div className="grid grid-cols-4 p-4 ml-7 gap-x-3 mr-3 items-center h-44 bg-gray-400 text-white rounded-lg font-bold">
                    <div className="col-span-1 font-montserrat font-meidum">
                        Final
                    </div>

                    <div className="font-montserrat font-meidum ml-[50px]">
                        
                    </div>

                    <div className="font-montserrat font-meidum ml-[65px]">
                        /10
                    </div>

                    <div className="font-montserrat font-meidum ml-[50px]">
                        
                    </div>
                </div>


            </div>
        </div>
    )
}