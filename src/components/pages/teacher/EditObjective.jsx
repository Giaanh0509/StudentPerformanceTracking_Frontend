import { TiDelete } from "react-icons/ti";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { editObjective } from "./ObjectiveDetails";

export const EditObjective = () => {

    const handleCloseModal = () => {
        setEditObjectives(false);
    }

    const [objective, setObjective] = useState({
        id: "",
        name: "",
    }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setObjective({
            ...objective,
            [name]: value,
        });
    };

    const handleSave = async () => {
        try {
            
        } catch (error) {
            console.error("Error updating subject:", error);
        }
    };

    const { id } = useContext(editObjective);
    const { editObjectives, setEditObjectives } = useContext(editObjective);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                axios.get(`http://localhost:8080/objectives/objectiveId=${id}`)
                    .then(response => {
                        setObjective(response.data);
                    })
                    .catch(error => {
                        console.error('There was an error!', error);
                    });
            };

            fetchData();
        }
    }, [id]);

    return(
        <div className="flex flex-col bg-white font-montserrat p-4 rounded-lg w-[500px] max-h-4/5 overflow-y-auto">
            <div className="flex justify-between text-xl font-medium mb-4">
                <div className="text-xl">
                    Edit Tracking:
                    <p className="font-bold ml-3 text-[#4dad8c]"></p>
                </div>
                <button onClick={handleCloseModal} className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete className="size-7" />
                </button>
            </div>

            <div className="flex flex-col gap-1">
                <label className="font-semibold">Name:</label>
                <input
                    type="text"
                    name="name"
                    value={objective.name}
                    onChange={handleChange}
                    className="w-full p-2 border border-black rounded-lg"
                />
            </div>


            <div className="flex justify-center bg-gradient-to-l mt-5 from-[#3ccb9b] to-[#1c8764] mt-1 rounded-lg">
                <button
                    onClick={handleSave}
                    className=" py-2 px-6 rounded-lg text-white hover:opacity-90 transition"
                >
                    Save
                </button>
            </div>
        </div>
    )
}