import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { TiDelete } from "react-icons/ti";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { statisticsContext } from "./ObjectiveDetails";

export const Statistics = () => {
    const { objective, trackings } = useContext(statisticsContext);
    const [selectedStudent, setSelectedStudent] = useState("");
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/groupsStudents/groupId=${objective.groupId}`);
                setStudents(response.data || []);
            } catch (error) {
                console.error('Lỗi khi tải danh sách sinh viên:', error);
            }
        };
        fetchData();
    }, [objective.groupId]);

    return (
        <div className="flex flex-col bg-white font-montserrat p-4 rounded-lg w-[1200px] max-h-[700px] overflow-y-auto">
            <div className="flex justify-between text-xl font-medium mb-4">
                <div className="text-xl">Statistics:</div>
                <button className="text-gray-600 hover:text-red-500 transition text-2xl">
                    <TiDelete className="size-7" />
                </button>
            </div>

            <div className="border-[1px] border-b-gray-400 mb-4"></div>

            <div className="flex justify-end">
                <select
                    className="border-2 border-gray-300 p-2 rounded mr-7 w-auto"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                >
                    <option value="">All students</option>
                    {students.map((student) => (
                        <option key={student.id} value={student.id}>
                            {student.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Render lại danh sách indicator khi selectedStudent thay đổi */}
            <div className="flex flex-col gap-y-8">
                {objective.indicatorDTOList.map((indicator, index) => (
                    <IndicatorChart 
                        key={index} 
                        indicator={indicator} 
                        trackings={trackings} 
                        selectedStudent={selectedStudent} 
                    />
                ))}
            </div>
        </div>
    );
};

const IndicatorChart = ({ indicator, trackings, selectedStudent }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setChartData([]);

                const updatedTrackings = await Promise.all(
                    trackings.map(async (tracking) => {
                        if (tracking.id && indicator) {
                            const url = selectedStudent
                                ? `http://localhost:8080/trackings/trackingId=${tracking.id}/indicatorId=${indicator.id}/studentId=${selectedStudent}`
                                : `http://localhost:8080/trackings/trackingId=${tracking.id}/indicatorId=${indicator.id}/statistics`;

                            const response = await axios.get(url);
                            
                            return {
                                name: tracking.name,
                                score: response.data,
                                objective: indicator.scale_max
                            };
                        }
                        return null;
                    })
                );

                setChartData([
                    ...updatedTrackings.filter(Boolean),
                    {
                        name: "",
                        score: indicator.scale_min,
                        objective: indicator.scale_max
                    },
                ].reverse());

            } catch (error) {
                console.error("Lỗi khi tải dữ liệu biểu đồ:", error);
            }
        };

        fetchData();
    }, [selectedStudent]);

    return (
        <div>
            <div className="mb-4">
                <p className="font-bold ml-3 text-[#4dad8c]">{indicator.skillName}</p>
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
                        <Line type="monotone" dataKey="objective" stroke="red" strokeWidth={2} strokeDasharray="5 5" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
