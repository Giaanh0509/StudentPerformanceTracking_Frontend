import { FaHome } from "react-icons/fa";
import { MdSubject } from "react-icons/md";
import { VscGraph } from "react-icons/vsc";


export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin',
		icon: <FaHome className='size-6' />
	},

	{
		key: 'subjects',
		label: 'Subjects',
		path: '/admin/subjects',
		icon: <MdSubject className='size-6' />
	},

	{
		key: 'statistics',
		label: 'Statistics',
		path: '/admin/statistics',
		icon: <VscGraph className='size-6' />
	}

]

