import { GoPersonFill } from "react-icons/go";
import { MdGroups } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { IoBookSharp } from "react-icons/io5";
import React from "react";
import { Bar, Line, Radar } from "react-chartjs-2";
import { 
    Chart as ChartJS, 
    CategoryScale, LinearScale, BarElement, LineElement, PointElement, RadialLinearScale, Title, Tooltip, Legend 
} from "chart.js";

ChartJS.register(
    CategoryScale, LinearScale, BarElement, LineElement, PointElement, RadialLinearScale, Title, Tooltip, Legend
);

export const TeacherDashboard = () => {
    const chartData = {
        labels: ["Students", "Groups", "Objectives", "Subjects"],
        datasets: [
            {
                label: "Overview",
                data: [50, 8, 2, 20],
                backgroundColor: ["#0476a3", "#b26d04", "#037807", "#a515be"],
                borderColor: ["#035c82", "#8c5203", "#025c05", "#7e0e94"],
                borderWidth: 2,
            },
        ],
    };

    const lineData = {
        labels: ["January", "February", "March", "April", "May"],
        datasets: [
            {
                label: "Monthly Sales",
                data: [65, 59, 80, 81, 56],
                borderColor: "blue",
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            title: { display: true, text: "Teacher Dashboard Overview" },
        },
    };

    const radarData = {
        labels: ["Speed", "Strength", "Agility", "Endurance", "Intelligence"],
        datasets: [
            {
                label: "Athlete Performance",
                data: [90, 100, 95, 90, 85],
                borderColor: "purple",
                backgroundColor: "rgba(128,0,128,0.3)",
                pointBackgroundColor: "red",
                pointRadius: 5,
            },
        ],
    };

    return (
        <div className="flex flex-col h-[655px]">
            <div className="flex flex-col h-[auto] bg-white mx-6 mt-4 p-1 rounded-lg shadow-lg shadow-slate-400">
                <div className="flex justify-between px-8 py-4 items-center">
                    <div className="flex gap-x-3 pl-5 bg-gradient-to-r from-[#0476a3] to-[#93c8e0] w-[270px] h-28 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                        <GoPersonFill className="border-slate-400 border-2 p-3 rounded-full" color="white" size={60} />
                        <div className="flex flex-col text-white">
                            <span className="font-montserrat font-bold text-3xl">50</span>
                            <span className="font-montserrat font-medium text-sm">Students</span>
                        </div>
                    </div>
                    <div className="flex gap-x-3 pl-5 bg-gradient-to-r from-[#b26d04] to-[#cfac78] w-[270px] h-28 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                        <MdGroups className="border-slate-400 border-2 p-2 rounded-full" color="white" size={60} />
                        <div className="flex flex-col text-white">
                            <span className="font-montserrat font-bold text-3xl">8</span>
                            <span className="font-montserrat font-medium text-sm">Groups</span>
                        </div>
                    </div>
                    <div className="flex gap-x-3 pl-5 bg-gradient-to-r from-[#037807] to-[#82d582] w-[270px] h-28 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                        <GoGoal className="border-slate-400 border-2 p-3 rounded-full" color="white" size={60} />
                        <div className="flex flex-col text-white">
                            <span className="font-montserrat font-bold text-3xl">2</span>
                            <span className="font-montserrat font-medium text-sm">Objectives</span>
                        </div>
                    </div>
                    <div className="flex gap-x-3 pl-5 bg-gradient-to-r from-[#a515be] to-[#d1a1db] w-[270px] h-28 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                        <IoBookSharp className="border-slate-400 border-2 p-3 rounded-full" color="white" size={60} />
                        <div className="flex flex-col text-white">
                            <span className="font-montserrat font-bold text-3xl">20</span>
                            <span className="font-montserrat font-medium text-sm">Subjects</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex h-full bg-white mx-6 mt-5 p-3 rounded-lg shadow-lg shadow-slate-400">
                <div className="w-full h-[300px]">
                    <Bar data={chartData} options={chartOptions} />
                </div>

                <div className="w-full h-[300px]">
                    <Radar data={radarData} />
                </div>
            </div>
        </div>
    );
};
