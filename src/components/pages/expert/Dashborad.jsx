import { GoPersonFill } from "react-icons/go";
import { MdGroups } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import axios from "axios";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { useState, createContext, useEffect } from "react";
import { FaFireAlt } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "./css/calendar.css";

export const Dashboard = () => {

    const [subjects, setSubjects] = useState([]);
    const [totalUses, setTotalUses] = useState(0);
    const [mostUsedSubject, setMostUsedSubject] = useState(null);
    const [topSubjects, setTopSubjects] = useState([]);

    const [events, setEvents] = useState([
        { title: 'Math Class', date: '2025-04-15' },
        { title: 'English Presentation', date: '2025-04-18' }
    ]);

    const handleDateClick = (info) => {
        const title = prompt('New event title:');
        if (title) {
            setEvents([...events, { title, date: info.dateStr }]);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`http://localhost:8080/subjects/all`)
                .then(response => {
                    const fetchedSubjects = response.data || [];
                    setSubjects(fetchedSubjects);

                    const total = fetchedSubjects.reduce((acc, subject) => acc + (subject.uses || 0), 0);
                    setTotalUses(total);

                    const mostUsed = fetchedSubjects.reduce((maxSub, current) => {
                        return (current.uses || 0) > (maxSub?.uses || 0) ? current : maxSub;
                    }, null);
                    setMostUsedSubject(mostUsed);

                    const topSubjects = [...fetchedSubjects]
                        .sort((a, b) => (b.uses || 0) - (a.uses || 0))
                        .slice(0, 5);
                    setTopSubjects(topSubjects);
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        };

        fetchData();
    }, []);

    const usagePieData = [
        {
            name: 'Unused',
            value: subjects.filter(subject => subject.uses === 0).length
        },
        {
            name: 'Used',
            value: subjects.filter(subject => subject.uses > 0).length
        }
    ];

    const PIE_COLORS = ["#f25f5c", "#247ba0"];

    const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 20;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill={PIE_COLORS[index]}
                textAnchor={x > cx ? "start" : "end"}
                dominantBaseline="central"
                fontSize={14}
            >
                {`${name}: ${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const [value, setValue] = useState(new Date());

    const getRecentMonthData = () => {
        const monthMap = {};
        const now = new Date();

        for (let i = 4; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
            monthMap[key] = 0;
        }

        subjects.forEach(subject => {
            if (subject.createDate) {
                const monthKey = subject.createDate.slice(0, 7);
                if (monthKey in monthMap) {
                    monthMap[monthKey]++;
                }
            }
        });

        return Object.entries(monthMap).map(([month, count]) => ({ month, count }));
    };

    const recentMonthData = getRecentMonthData();

    return (
        <div className="flex">
            <div className="flex flex-col">
                <div className="flex flex-col h-auto bg-white rounded-xl mx-6 mt-4 p-3 shadow-lg shadow-slate-400 w-[650px]">
                    <div className="flex justify-between px-2 py-1 items-center w-">
                        <div className="flex flex-col  gap-x-3 bg-[#2ec4b6] w-[190px] h-44 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                            <IoBookSharp className=" p-3 mt-1" color="white" size={80} />
                            <div className="flex flex-col items-center gap-y-1 text-white">
                                <span className="font-montserrat font-bold text-6xl">{subjects.length}</span>
                                <span className="font-montserrat font-medium text-sm">Subjects</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-x-3 bg-[#60b8d1] w-[190px] h-44 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                            <AiOutlineNumber className=" p-2 mt-1" color="white" size={80} />
                            <div className="flex flex-col items-center gap-y-1 text-white">
                                <span className="font-montserrat font-bold text-6xl">{totalUses}</span>
                                <span className="font-montserrat font-medium text-sm">Uses</span>
                            </div>
                        </div>
                        <div className="flex flex-col bg-[#4abd93] w-[190px] h-44 rounded-lg items-center shadow-lg shadow-slate-400">
                            <FaFireAlt className="p-3 rounded-full mt-1" color="white" size={80} />
                            <span className="font-montserrat font-medium items-center text-lg text-white">Most used Subject</span>
                            <div className="flex flex-col items-center text-white">
                                <span className="font-montserrat font-bold text-3xl">
                                    {mostUsedSubject ? `${mostUsedSubject.name} ` : "N/A"}
                                </span>
                                <span className="text-base">
                                    {mostUsedSubject ? `${mostUsedSubject.uses} ` : "N/A"} uses
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col h-[420px] bg-white rounded-xl mx-6 mt-4 p-3 shadow-lg shadow-slate-400 w-[650px]">
                    <h2 className="text-xl font-semibold mb-4 text-center mt-1">Subject Usage Ratio</h2>
                    <div className="flex">
                        <PieChart width={400} height={350}>
                            <Pie
                                data={usagePieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={120}
                                fill="#8884d8"
                                dataKey="value"
                                label={renderCustomLabel}
                            >
                                {usagePieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value, name) => [`${value} subjects`, name]} />
                            <Legend />
                        </PieChart>

                        <div className="flex flex-col">
                            <div className="flex flex-col gap-3 text-base text-gray-700 px-6 mt-2">
                                {topSubjects.map((subject, index) => (
                                    <div key={subject.id} className="flex items-center gap-x-4 justify-between p-3 rounded-md shadow-sm bg-[#f1f5f9] hover:bg-[#e2e8f0] transition">
                                        <div className="flex items-center gap-x-2">
                                            <span className="text-lg font-bold text-gray-700">{index + 1}.</span>
                                            <span className="text-base font-semibold text-[#2b2d42]">{subject.name}</span>
                                        </div>
                                        <span className="text-[#30a97c] font-bold">{subject.uses} uses</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col">
                <div className="flex flex-col h-[400px] items-center gap-y-2 bg-white rounded-xl mt-4 p-5 shadow-lg shadow-slate-400 w-[630px]">
                    <h2 className="text-xl font-semibold mb-4 text-center">📅 Calendar</h2>
                    <Calendar
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: 750, width: "100%" }}
                    />
                </div>

                <div className="flex flex-col h-[226px] items-center gap-y-2 bg-white rounded-xl mt-4 p-5 shadow-lg shadow-slate-400 w-[630px]">
                <h2 className="text-xl font-semibold mb-4 text-center">📊 Subjects Created Per Month</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={recentMonthData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#2ec4b6" barSize={40} radius={[10, 10, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>


        </div>
    )
}