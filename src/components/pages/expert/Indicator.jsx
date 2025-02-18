import { TiDelete } from "react-icons/ti";
import IndicatorService from "../../../services/IndicatorService";
import { useEffect, useContext, useState } from "react";
import { indicatorContext } from "./SubjectDetail";
import { selectedSkillContext } from "./selectedSkillContext";


export const Indicator = () => {

    const { selectedSkillId } = useContext(selectedSkillContext);
    const { setPopup } = useContext(selectedSkillContext);

    const [indicator, setIndicator] = useState(null);

    const handleClosePopup = () => {
        setPopup(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await IndicatorService.getAllIndicators();
                const matchedIndicator = response.data.find(ind => ind.skillId === selectedSkillId);
                if (matchedIndicator) {
                    setIndicator(matchedIndicator);
                }
            } catch (err) {
                console.error("Error fetching indicator:", err);
            }
        };

        fetchData();
    }, [selectedSkillId]);


    return(
        <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg w-[350px] h-2/6">
            <div className="flex justify-between">
                <div className="font-bold text-xl ">Indicator's infomation</div>
                <button onClick={handleClosePopup} className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete className="size-7"/>
                </button>
            </div>
            <div className="border-[1px] border-b-gray-400"></div>

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Name:</div>
                <div className="mr-20 text-[#046b49]">{indicator?.name}</div>
            </div>

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Scale_min:</div>
                <div className="mr-[108px] text-[#046b49]">{indicator?.scale_min}</div>
            </div>

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Scale_max:</div>
                <div className="mr-[108px] text-[#046b49]">{indicator?.scale_max}</div>
            </div>

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Evaluation_type:</div>
                <div className="mr-20 text-[#046b49]">{indicator?.evaluation_type}</div>
            </div>

        </div>
    )
}