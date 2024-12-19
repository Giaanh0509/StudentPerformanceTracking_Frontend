import { FaHome } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { PiStudent } from "react-icons/pi";
import { GoGoal } from "react-icons/go";



export const DASHBOARD_SIDEBAR_TEACHER_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/teacher',
		icon: <FaHome className='size-6' />
	},

    {
		key: 'subjects',
		label: 'Objectives',
		path: '/teacher/objectives',
		icon: <GoGoal className='size-6' />
	},

	{
		key: 'subjects',
		label: 'Students',
		path: '/teacher/students',
		icon: <PiStudent className='size-6' />
	},

	{
		key: 'statistics',
		label: 'Statistics',
		path: '/admin/statistics',
		icon: <VscGraph className='size-6' />
	}
]

