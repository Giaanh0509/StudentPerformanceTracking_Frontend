import { useState, useContext, useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { createTrackingContext } from "./ObjectiveDetails";
import TrackingService from "../../../services/TrackingService";

export const NewTracking = ({ onSuccessCreate }) => {

    const { id } = useContext(createTrackingContext);
    const { setCreateTrackingPopup } = useContext(createTrackingContext);
    const { setTrackings } = useContext(createTrackingContext);
    const { render, setRender } = useContext(createTrackingContext);

    const currentDate = new Date().toISOString().split('T')[0];

    const [tracking, setTracking] = useState({
        id: "",
        name: "",
        trackingDate: "",
        description: "",
        createDate: currentDate,
        objectiveId: id
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setTracking({ ...tracking, [e.target.name]: value });
    }

    const handleCloseModal = () => {
        setCreateTrackingPopup(false);
    };

    const saveTracking = (e) => {
        e.preventDefault();

        TrackingService.saveTracking(tracking)
            .then((response) => {
                setTrackings((prevTracking) => [...prevTracking, response.data]);
                setCreateTrackingPopup(false);
                setRender(render + 1);
                onSuccessCreate && onSuccessCreate();
            })
            .catch((err) => {
                console.error(err);
            })
    }

    return (
        <div className="flex flex-col gap-y-4 bg-white font-montserrat p-4 rounded-lg w-[500px] h-auto">
            <div className="flex justify-between">
                <h2 className="font-bold text-xl text-[#03966c]">Create New Tracking</h2>
                <button className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete onClick={handleCloseModal} className="size-7" />
                </button>
            </div>
            <div className="border-[1px] border-b-gray-400"></div>

            <div className="flex flex-col gap-1">
                <span className="font-semibold">Name:</span>
                <input
                    type="text"
                    name="name"
                    value={tracking.name}
                    onChange={(e) => handleChange(e)}
                    placeholder="Enter tracking name"
                    className={`border-2 p-2 w-full rounded-lg`} />
            </div>

            <div className="flex flex-col gap-1">
                <span className="font-semibold">Decription:</span>
                <textarea
                    name="description"
                    placeholder="Enter tracking description"
                    value={tracking.description}
                    onChange={(e) => handleChange(e)}
                    className={`border-2 p-2 w-full rounded-lg resize-none`}
                    rows="3"
                ></textarea>
            </div>

            <div className="flex flex-col gap-1 gap-y-2">
                <span className="font-semibold">Tracking date:</span>
                <input
                    type="date"
                    className="border-2 p-2 rounded-lg w-[130px]"
                    name="trackingDate"
                    value={tracking.trackingDate}
                    onChange={(e) => handleChange(e)}
                />
            </div>

            <div className="flex justify-center mt-2 bg-gradient-to-l from-[#32c997] to-[#1c8764]  rounded-lg">
                <button onClick={saveTracking} className="py-2 px-4 text-white">Create</button>
            </div>
        </div>
    )
}