import { GoPersonFill } from "react-icons/go";
import { MdGroups } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import React, { useState } from "react";
import "./css/calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import enUS from "date-fns/locale/en-US";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Select from "react-select"; 


const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


// const events = [
//     { title: "日本語", start: new Date(2025, 2, 4, 10, 15), end: new Date(2025, 2, 4, 11, 45) },
//     { title: "ITSS in Japanese", start: new Date(2025, 2, 4, 14, 10), end: new Date(2025, 2, 4, 17, 30) },
//     { title: "N2対策_2セメ", start: new Date(2025, 2, 5, 14, 0), end: new Date(2025, 2, 5, 15, 30) },
//     { title: "N2対策_2セメ", start: new Date(2025, 2, 7, 13, 30), end: new Date(2025, 2, 7, 15, 0) },
// ];

const months = [
    { value: 0, label: "January" },
    { value: 1, label: "February" },
    { value: 2, label: "March" },
    { value: 3, label: "April" },
    { value: 4, label: "May" },
    { value: 5, label: "June" },
    { value: 6, label: "July" },
    { value: 7, label: "August" },
    { value: 8, label: "September" },
    { value: 9, label: "October" },
    { value: 10, label: "November" },
    { value: 11, label: "December" },
];

const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - 5 + i;
    return { value: year, label: year };
});

const CustomToolbar = (toolbar) => {
    const goToBack = () => {
        toolbar.onNavigate("PREV");
    };

    const goToNext = () => {
        toolbar.onNavigate("NEXT");
    };

    return (
        <div className="flex justify-between items-center p-3 bg-white text-white rounded-md shadow-md">
            <div className="flex items-center gap-1">
                <button
                    className="px-3 py-1 bg-gray-200 text-black mr-3 rounded-md hover:bg-gray-300"
                    onClick={() => toolbar.onView("month")}
                >This month</button>
                <button onClick={goToBack} className="py-2 bg-white text-[#03865a] rounded-full hover:bg-gray-200">
                    <FaChevronLeft size={15} />
                </button>
                <button onClick={goToNext} className="py-2 bg-white text-[#03865a] rounded-full hover:bg-gray-200">
                    <FaChevronRight size={15} />
                </button>
            </div>

            <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-[#03865a]">{toolbar.label}</span>
                <FaRegCalendarAlt color="#03865a" className="pb-1" size={25}/>
            </div>


            <div className="flex gap-2">
                <button
                    className="px-3 py-1 bg-gray-200 text-black rounded-md hover:bg-gray-300"
                    onClick={() => toolbar.onView("month")}
                >
                    Month
                </button>
                <button
                    className="px-3 py-1  bg-gray-200 text-black rounded-md hover:bg-gray-300"
                    onClick={() => toolbar.onView("week")}
                >
                    Week
                </button>
                <button
                    className="px-3 py-1  bg-gray-200 text-black rounded-md hover:bg-gray-300"
                    onClick={() => toolbar.onView("day")}
                >
                    Day
                </button>
            </div>
        </div>
    );
};


export const TeacherDashboard = () => {
    return (
        <div className="flex flex-col h-[655px]">
            <div className="flex flex-col h-auto bg-white mx-6 mt-4 p-1 rounded-lg shadow-lg shadow-slate-400">
                <div className="flex justify-between px-8 py-4 items-center">
                    <div className="flex gap-x-3 pl-5 bg-gradient-to-r from-[#0476a3] to-[#93c8e0] w-[270px] h-24 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                        <GoPersonFill className="border-slate-400 border-2 p-3 rounded-full" color="white" size={60} />
                        <div className="flex flex-col text-white">
                            <span className="font-montserrat font-bold text-3xl">50</span>
                            <span className="font-montserrat font-medium text-sm">Students</span>
                        </div>
                    </div>
                    <div className="flex gap-x-3 pl-5 bg-gradient-to-r from-[#b26d04] to-[#cfac78] w-[270px] h-24 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                        <MdGroups className="border-slate-400 border-2 p-2 rounded-full" color="white" size={60} />
                        <div className="flex flex-col text-white">
                            <span className="font-montserrat font-bold text-3xl">8</span>
                            <span className="font-montserrat font-medium text-sm">Groups</span>
                        </div>
                    </div>
                    <div className="flex gap-x-3 pl-5 bg-gradient-to-r from-[#037807] to-[#82d582] w-[270px] h-24 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                        <GoGoal className="border-slate-400 border-2 p-3 rounded-full" color="white" size={60} />
                        <div className="flex flex-col text-white">
                            <span className="font-montserrat font-bold text-3xl">2</span>
                            <span className="font-montserrat font-medium text-sm">Objectives</span>
                        </div>
                    </div>
                    <div className="flex gap-x-3 pl-5 bg-gradient-to-r from-[#a515be] to-[#d1a1db] w-[270px] h-24 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                        <IoBookSharp className="border-slate-400 border-2 p-3 rounded-full" color="white" size={60} />
                        <div className="flex flex-col text-white">
                            <span className="font-montserrat font-bold text-3xl">20</span>
                            <span className="font-montserrat font-medium text-sm">Subjects</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex h-auto overflow-y-auto bg-white w-[1305px] mx-6 mt-5 p-3 rounded-lg shadow-lg shadow-slate-400 items-center justify-center">
                <Calendar
                    localizer={localizer}
                    // events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 460, width: "100%" }}
                    components={{
                        toolbar: CustomToolbar, // Gán toolbar mới
                    }}
                />
            </div>
        </div>
    );
};
