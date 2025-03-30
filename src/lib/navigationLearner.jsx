import { FaHome } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";
import { PiStudent } from "react-icons/pi";
import { GoGoal } from "react-icons/go";
import { MdOutlineGroups } from "react-icons/md";



export const DASHBOARD_SIDEBAR_LEARNER_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/learner',
		icon: <FaHome className='size-6' />
	},

    {
		key: 'groups',
		label: 'Groups',
		path: '/learner/groups',
		icon: <MdOutlineGroups className='size-6' />
	},

    {
		key: 'objectives',
		label: 'Objectives',
		path: '/learner/objectives',
		icon: <GoGoal className='size-6' />
	},

]

