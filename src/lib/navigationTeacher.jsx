import { FaHome } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { PiStudent } from "react-icons/pi";
import { GoGoal } from "react-icons/go";
import { MdOutlineGroups } from "react-icons/md";



export const DASHBOARD_SIDEBAR_TEACHER_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/teacher',
		icon: <FaHome className='size-6' />
	},

	{
		key: 'subjects',
		label: 'Subjects',
		path: '/teacher/subjects',
		icon: <MdSubject className='size-6' />
	},

    {
		key: 'objectives',
		label: 'Objectives',
		path: '/teacher/objectives',
		icon: <GoGoal className='size-6' />
	},

	{
		key: 'groups',
		label: 'Groups',
		path: '/teacher/groups',
		icon: <MdOutlineGroups className='size-6' />
	}
]

