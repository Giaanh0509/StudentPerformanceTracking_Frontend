import React, { createContext, useContext, useState } from 'react';
import { DASHBOARD_SIDEBAR_EXPERT_LINKS } from '../../../lib/navigationExpert';
import Logo from "../../../assets/logo.png";
import { Link, useLocation } from 'react-router-dom';
import { FaBookOpen } from "react-icons/fa";


export const SideBar = () => {

  return (
    <div className="flex flex-col w-48 p-4 pt-9 duration-300 h-screen bg-gradient-to-b from-[#20c5a4] to-[#0c8c7f] shadow-slate-400 shadow-xl">
      <div className="flex gap-x-8 justify-center">
        <img src={`${Logo}`} alt="" className="w-20 h-20 rounded-full border-4 border-white" />
      </div>
      <div className="flex justify-center mt-5 text-2xl text-center text-white font-sans font-semibold">
          EduMetrics
      </div>

      <div className="flex-1 mt-10">
        {DASHBOARD_SIDEBAR_EXPERT_LINKS.map((SideBar) => (
          <SideBarLink key={SideBar.key} SideBar={SideBar}>
          </SideBarLink>
        ))}
      </div>
    </div>

  )
}

const SideBarLink = ({ SideBar }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const isDashboardActive = SideBar.key === 'dashboard' && pathname === '/expert';
  const isSubjectsActive = SideBar.key === 'subjects' && (pathname === '/expert/subjects' || pathname.startsWith('/expert/subjects/'));
  const isStatisticsActive = SideBar.key === 'statistics' && pathname === '/expert/statistics';

  const isActive = isDashboardActive || isSubjectsActive || isStatisticsActive;

  return (
    <Link
      className={`flex items-center mb-1 gap-x-1 text-sm rounded-lg text-white hover:bg-gradient-to-r from-[#e9f2f2] hover:text-black to-[#cfeadf] 
        ${isActive ? 'bg-gradient-to-r from-[#4c6363] to-[#dae9e2] text-black' : ''}`}
      to={SideBar.path}
    >
      <div className={`flex justify-start items-center gap-x-4 font-medium py-2 ${isActive ? 'text-black' : ''}`}>
        <span className="ml-4"> {SideBar.icon} </span>
        <span className=""> {SideBar.label} </span>
      </div>
    </Link>
  )
}