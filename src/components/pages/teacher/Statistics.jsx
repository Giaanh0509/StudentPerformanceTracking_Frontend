import { useEffect, useState } from "react";
import axios from "axios";
import { TiDelete } from "react-icons/ti";
import { useContext } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { statisticsContext } from "./ObjectiveDetails";

export const Statistics = () => {
    const { objective } = useContext(statisticsContext);
    const { trackings } = useContext(statisticsContext);

    return (
        <div className="flex flex-col bg-white font-montserrat p-4 rounded-lg w-[1200px] max-h-[700px] overflow-y-auto">
            <div className="flex justify-between text-xl font-medium mb-4">
                <div className="text-xl">Statistics:</div>
                <button className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete className="size-7" />
                </button>
            </div>

            <div className="border-[1px] border-b-gray-400 mb-4"></div>

            <div className="flex flex-col gap-y-8">
                {objective.indicatorDTOList.map((indicator, index) => (
                    <IndicatorChart key={index} indicator={indicator} trackings={trackings} />
                ))}
            </div>
        </div>
    );
};

// Component xử lý biểu đồ
const IndicatorChart = ({ indicator, trackings }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const updatedTrackings = await Promise.all(
                    trackings.map(async (tracking) => {
                        if (tracking.id && indicator) {
                            const response = await axios.get(
                                `http://localhost:8080/trackings/trackingId=${tracking.id}/indicatorId=${indicator.id}/statistics`
                            );
                            return {
                                name: tracking.name,
                                score: response.data, 
                            };
                        }
                    })
                );

                setChartData([
                    ...updatedTrackings,
                    { name: "", score: indicator.scale_min },
                ].reverse());
            } catch (error) {
                console.error("Lỗi khi gọi API:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <div className="mb-4">
                <p className="font-bold ml-3 text-[#4dad8c]">{indicator.skillName} Progress</p>
            </div>

            {/* Biểu đồ Line Chart */}
            <div className="w-full h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            dataKey="name"
                            tickFormatter={(name) => name.length > 9 ? name.slice(0, 9) + "..." : name}
                            angle={0}
                            textAnchor="end"
                        />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="score" stroke="#4dad8c" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
