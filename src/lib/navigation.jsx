import { FaHome } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";


export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <FaHome className='size-6' />
	},

	{
		key: 'subjects',
		label: 'Subjects',
		path: '/subjects',
		icon: <MdSubject className='size-6' />
	},

	{
		key: 'statistics',
		label: 'Statistics',
		path: '/statistics',
		icon: <VscGraph className='size-6' />
	}

]

