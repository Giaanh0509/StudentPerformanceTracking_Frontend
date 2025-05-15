import { GoPersonFill } from "react-icons/go";
import { MdGroups } from "react-icons/md";
import { GoGoal } from "react-icons/go";
import axios from "axios";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoBookSharp } from "react-icons/io5";
import { useState, createContext, useEffect } from "react";
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
                <FaRegCalendarAlt color="#03865a" className="pb-1" size={25} />
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

    const [subjects, setSubjects] = useState([]);
    const [groups, setGroups] = useState([]);
    const [trackings, setTrackings] = useState([]);
    const [events, setEvents] = useState([]);
    const [objectives, setObjectives] = useState([]);
    const [userInfo, setUserInfo] = useState({
        id: "",
        name: "",
        roleId: ""
    }
    )


    useEffect(() => {
        const fetchData = async () => {
            axios.get(`studentperformancetrackingbackend-production.up.railway.app/subjects/all`)
                .then(response => {
                    {
                        const fetchedSubjects = response.data || [];
                        setSubjects(response.data);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        };

        fetchData();

    }, [])

    useEffect(() => {
        const storedUserLoginDTO = localStorage.getItem('userLoginDTO');

        if (storedUserLoginDTO) {
            try {
                const userLoginDTO = JSON.parse(storedUserLoginDTO);

                setUserInfo(userLoginDTO);
            } catch (e) {
                console.error('Error parsing userLoginDTO from localStorage:', e);
            }
        } else {
            console.log('No user info found in localStorage');
        }
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`studentperformancetrackingbackend-production.up.railway.app/trackings/all`);
                const fetchedTrackings = response.data || [];

                // Chuyển đổi dữ liệu tracking thành định dạng sự kiện của Calendar
                const mappedEvents = fetchedTrackings.map(tracking => ({
                    title: tracking.name || "Tracking Event",  // Nếu có tên tracking
                    start: new Date(tracking.trackingDate),  // Ngày bắt đầu
                    end: new Date(tracking.trackingDate),    // Có thể thêm thời gian kết thúc nếu có
                    allDay: true,  // Đánh dấu là sự kiện cả ngày
                }));

                setEvents(mappedEvents);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu trackings:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            axios.get(`studentperformancetrackingbackend-production.up.railway.app/groups/userId=${userInfo.id}`)
                .then(response => {
                    {
                        const fetchedSubjects = response.data || [];
                        setGroups(response.data);
                    }
                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        };

        fetchData();
    })

    useEffect(() => {
        axios.get(`studentperformancetrackingbackend-production.up.railway.app/objectives/userId=${userInfo.id}`)
            .then(response => setObjectives(response.data || []))
            .catch(error => console.error("Error fetching objectives:", error));
    });

    return (
        <div className="flex flex-col max-h-[665px] overflow-y-auto">
            <div className="flex justify-between px-6 py-4 mt-2 items-center">
                <div className="flex gap-x-3 pl-5 bg-[#2ec4b6] w-[270px] h-24 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                    <GoPersonFill className="border-slate-500 border-2 p-3 rounded-full" color="white" size={60} />
                    <div className="flex flex-col text-white">
                        <span className="font-montserrat font-bold text-3xl">50</span>
                        <span className="font-montserrat font-medium text-sm">Students</span>
                    </div>
                </div>
                <div className="flex gap-x-3 pl-5 bg-[#60b8d1] w-[270px] h-24 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                    <MdGroups className="border-slate-500 border-2 p-2 rounded-full" color="white" size={60} />
                    <div className="flex flex-col text-white">
                        <span className="font-montserrat font-bold text-3xl">{groups.length}</span>
                        <span className="font-montserrat font-medium text-sm">Groups</span>
                    </div>
                </div>
                <div className="flex gap-x-3 pl-5 bg-[#4abd93] w-[270px] h-24 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                    <GoGoal className="border-slate-500 border-2 p-3 rounded-full" color="white" size={60} />
                    <div className="flex flex-col text-white">
                        <span className="font-montserrat font-bold text-3xl">{objectives.length}</span>
                        <span className="font-montserrat font-medium text-sm">Objectives</span>
                    </div>
                </div>
                <div className="flex gap-x-3 pl-5 bg-[#ab9ee7] w-[270px] h-24 rounded-lg items-center justify-start shadow-lg shadow-slate-400">
                    <IoBookSharp className="border-slate-500 border-2 p-3 rounded-full" color="white" size={60} />
                    <div className="flex flex-col text-white">
                        <span className="font-montserrat font-bold text-3xl">{subjects.length}</span>
                        <span className="font-montserrat font-medium text-sm">Subjects</span>
                    </div>
                </div>
            </div>
            <div className="flex max-h-[800px] bg-white w-[1290px] mx-6 mt-2 p-3 rounded-lg shadow-lg shadow-slate-400 items-center justify-center">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 750, width: "100%" }}
                    components={{
                        toolbar: CustomToolbar,
                    }}
                />
            </div>
        </div>
    );
};
