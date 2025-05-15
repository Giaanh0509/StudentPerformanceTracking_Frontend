import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { trackingContext } from "./ObjectiveDetails";

export const EditTracking = () => {

    const { id } = useContext(trackingContext);
    const { setTrackingPopup } = useContext(trackingContext);
    const { indicator } = useContext(trackingContext);
    const { trackingId } = useContext(trackingContext);

    const [students, setStudents] = useState([]);

    const [formData, setFormData] = useState([]);

    const handleCloseModal = () => {
        setTrackingPopup(false);
    }

    const handleTrackingValueChange = (index, value) => {
        setStudents(prevStudents =>
            prevStudents.map((student, idx) =>
                idx === index ? { ...student, trackingValue: value } : student
            )
        );
    }

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                axios.get(`studentperformancetrackingbackend-production.up.railway.app/students/objectiveId=${id}`)
                    .then(response => {
                        setStudents(response.data);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
            };

            fetchData();
        }
    }, [id]);

    useEffect(() => {
        if (trackingId && indicator) {
            axios.get(`studentperformancetrackingbackend-production.up.railway.app/trackings/trackingId=${trackingId}/indicatorId=${indicator.id}`)
                .then(response => {
                    const trackingValues = response.data;

                    setStudents(prevStudents =>
                        prevStudents.map((student, index) => ({
                            ...student,
                            trackingValue: trackingValues[index] ?? 0
                        }))
                    );
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    }, [trackingId, indicator]);

    useEffect(() => {
        setFormData(students);
    }, [students]);

    const handleSave = async () => {
        try {
            await axios.put(`studentperformancetrackingbackend-production.up.railway.app/trackings/details/update/${trackingId}/${indicator.id}`, formData);
            setTrackingPopup(false);
        } catch (error) {
            console.error("Error updating subject:", error);
        }
    };

    return (
        <div className="flex flex-col bg-white font-montserrat p-4 rounded-lg w-[1100px] max-h-4/5 overflow-y-auto">
            <div className="flex justify-between text-xl font-medium mb-4">
                <div className="text-xl">
                    Edit Tracking:
                    <p className="font-bold ml-3 text-[#4dad8c]"></p>
                </div>
                <button onClick={handleCloseModal} className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete className="size-7" />
                </button>
            </div>
            <div className="border-[1px] border-b-gray-400 mb-4"></div>

            <div className='flex justify-between mr-3'>
                <div className='w-1/3 h-auto bg-neutral-200 my-2 py-3 px-4 gap-y-5 rounded-xl'>
                    <div className='text-lg flex items-center gap-x-4 font-montserrat font-bold mb-3'>Infomation
                    </div>

                    <div className='flex font-medium justify-between mr-[70px] mb-3'>
                        <div className='flex gap-x-24'>Skill:<div className='text-[#348a6c]'>
                            {indicator.skillName}
                        </div>
                        </div>
                    </div>

                    <div className='flex font-medium justify-between mr-[70px] mb-3'>
                        <div className='flex gap-x-16'>Start value:<div className='text-[#348a6c]'>
                            {indicator.scale_min}
                        </div>
                        </div>
                    </div>

                    <div className='flex font-medium justify-between mr-[70px] mb-3'>
                        <div className='flex gap-x-8'>Objective value:<div className='text-[#348a6c]'>
                            {indicator.scale_max}
                        </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-3">
                <div className="max-h-60 overflow-y-auto border p-2 bg-neutral-300  border-gray-300">
                    <div className="p-1">
                        <div className="grid grid-cols-5 ml-3">
                            <div>Email</div>
                            <div className="ml-20">Name</div>
                            <div className="ml-20">Indicator</div>
                            <div className="ml-20">Current</div>
                            <div className="ml-20">Type</div>
                        </div>
                    </div>
                </div>

                <div className="max-h-60 overflow-y-auto border-x border-b p-2 border-gray-300 rounded">
                    <div className="flex flex-col p-1 gap-y-3">
                        {students.map((student, index) => (
                            <div className="grid grid-cols-5 ml-3 mt-1" key={student.id}>
                                <div>{student.email}</div>
                                <div className="ml-20">{student.name}</div>
                                <div className="ml-20">{indicator.name}</div>
                                <div className="ml-20">
                                    <input
                                        className="border-2 rounded-md w-14 px-1 h-9 border-gray-300"
                                        type="number"
                                        value={student.trackingValue}
                                        onChange={(e) => handleTrackingValueChange(index, e.target.value)}
                                    />
                                </div>
                                <div className="ml-20"> {indicator.evaluation_type}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="flex mt-5 justify-center bg-gradient-to-l from-[#4df1bb] to-[#1c8764]  rounded-lg">
                <button onClick={handleSave} className="py-2 px-4 text-white font-semibold">Save</button>
            </div>
        </div>
    )
}