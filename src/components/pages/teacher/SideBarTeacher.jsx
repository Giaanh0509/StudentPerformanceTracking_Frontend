import React, { createContext, useContext, useState } from 'react';
import { DASHBOARD_SIDEBAR_TEACHER_LINKS } from '../../../lib/navigationTeacher';
import Logo from "../../../assets/logo.png";
import { Link, useLocation } from 'react-router-dom';


export const SideBarTeacher = () => {

  return (
    <div className="flex flex-col w-60 p-4 pt-9 duration-300 h-screen bg-gradient-to-b from-[#58f5c0] to-[#048a5e]">
      <div className="flex gap-x-8 justify-center">
        <img src={`${Logo}`} alt="" className="w-20 h-20 rounded-full border-4 border-white" />
      </div>
      <div className="flex justify-center mt-5 text-lg text-center text-white font-sans font-semibold">
        Student Performance Tracking
      </div>

      <div className="flex-1 mt-10">
        {DASHBOARD_SIDEBAR_TEACHER_LINKS.map((SideBar) => (
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

  const isDashboardActive = SideBar.key === 'dashboard' && pathname === '/teacher';
  const isSubjectsActive = SideBar.key === 'groups' && (pathname === '/teacher/groups' || pathname.startsWith('/teacher/groups/'));
  const isStatisticsActive = SideBar.key === 'objectives' && pathname === '/teacher/objectives';

  const isActive = isDashboardActive || isSubjectsActive || isStatisticsActive;

  return (
    <Link
      className={`flex items-center p-1 gap-x-1 text-sm text-white hover:bg-gradient-to-r from-[#e9f2f2] hover:text-black to-[#cfeadf] 
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