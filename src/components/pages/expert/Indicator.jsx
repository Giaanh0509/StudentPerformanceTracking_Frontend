import { TiDelete } from "react-icons/ti";
import IndicatorService from "../../../services/IndicatorService";
import { useEffect, useContext, useState } from "react";
import { indicatorContext } from "./SubjectDetail";
import { selectedSkillContext } from "./selectedSkillContext";


export const Indicator = () => {

    const { selectedSkillId } = useContext(selectedSkillContext);

    const [indicator, setIndicator] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await IndicatorService.getAllIndicators();
                {response.data.map((indicator) => {
                    if(indicator.skillId == selectedSkillId) {
                        setIndicator(indicator);
                    };
                })}
            } catch (err) {
                console.log(err);
            }

        };

        fetchData();

    }, [])

    console.log(indicator);

    return(
        <div className="flex flex-col gap-y-4 bg-white p-4 rounded-lg w-[350px] h-2/6">
            <div className="flex justify-between">
                <div className="font-bold text-xl ">Indicator's infomation</div>
                <TiDelete className="size-7" />
            </div>
            <div className="border-[1px] border-b-gray-400"></div>

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Name:</div>
                <div className="mr-20 text-[#0fc692]">{indicator?.name}</div>
            </div>

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Scale_min:</div>
                <div className="mr-[108px] text-[#0fc692]">{indicator?.scale_min}</div>
            </div>

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Scale_max:</div>
                <div className="mr-[108px] text-[#0fc692]">{indicator?.scale_max}</div>
            </div>

            <div className="flex justify-between gap-x-5">
                <div className="font-semibold">Evaluation_type:</div>
                <div className="mr-20 text-[#0fc692]">{indicator?.evaluation_type}</div>
            </div>

        </div>
    )
}