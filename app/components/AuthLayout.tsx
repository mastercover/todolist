import { useEffect, useState } from 'react';
import DehazeIcon from '@mui/icons-material/Dehaze';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface authLayoutProps {
    children: React.ReactNode;
}
const authLayout = ({ children }: authLayoutProps) => {
    const [showMenu, setShowMenu] = useState(true);
    const [collapsed, setCollapsed] = useState<boolean>(false)
    const [openKeys, setOpenKeys] = useState<Record<string, boolean>>({})
    const toggle = () => setCollapsed(v => !v)
    const toggleKey = (key: string) => setOpenKeys(s => ({ ...s, [key]: !s[key] }))
    const [now, setNow] = useState(new Date());
    const pathname = usePathname();

    useEffect(() => {
        const collapsedValue = localStorage.getItem('cms.sidebar.collapsed');
        setCollapsed(collapsedValue === null ? false : JSON.parse(collapsedValue));
        const openKeysValue = localStorage.getItem('cms.sidebar.openKeys');
        setOpenKeys(openKeysValue === null ? {} : JSON.parse(openKeysValue));
    }, []);
    useEffect(() => { localStorage.setItem('cms.sidebar.collapsed', JSON.stringify(collapsed)); }, [collapsed]);
    useEffect(() => { localStorage.setItem('cms.sidebar.openKeys', JSON.stringify(openKeys)); }, [openKeys]);


    const sidebarW = collapsed ? 64 : 370
    useEffect(() => {
        document.documentElement.style.setProperty('--sidebar-w', `${sidebarW}px`)
    }, [sidebarW])

    return (
        <main className="grid-rows-2 grid-cols-1 md:grid-cols-2 gap-4 px-[27px] py-[31px] bg-[#fff] h-screen relative">
            <div className="bg-[#fff] h-full flex flex-col md:flex-row overflow-hidden gap-[2%]">
                <div className={clsx('bg-[#F4F4F4] p-4 rounded-4xl', 'transition-[width] duration-300 ease-in-out',)} style={{ width: sidebarW, minWidth: sidebarW }} aria-label="Main sidebar">
                    {!collapsed ? (
                        <div className='h-full px-[20px] py-[20px]'>
                            <div className="h-[90%]">
                                <div className="flex items-center justify-between mb-2">
                                    <h2 className="text-2xl font-bold">Menu</h2>
                                    <div className="mb-2">
                                        <button
                                            onClick={() => setCollapsed(!collapsed)}
                                            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-300 shadow"
                                        >
                                            <DehazeIcon />
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <div className="relative rounded-full mb-6">
                                        <SearchIcon className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="text"
                                            placeholder="Search..."
                                            className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                    </div>
                                </div>

                                <div className="pl-2 mb-5">
                                    <h2 className="text-lg font-bold mb-3">Tasks</h2>
                                    <ul className="space-y-4 text-sm text-gray-700">
                                        <li className={`flex items-center justify-between px-2 py-1 rounded-full transition ${pathname.includes("/todoList/upComing") ? "bg-gray-300 " : "hover:text-green-600"}`}>
                                            <Link href="/todoList/upComing">
                                                <div className="flex items-center space-x-3">
                                                    <KeyboardDoubleArrowRightIcon className="h-5 w-5" />
                                                    <span>Upcoming</span>
                                                </div>
                                            </Link>
                                            <span className={`text-xs ${pathname.includes("/todoList/upComing") ? "bg-sky-50 " : " bg-gray-300"}  rounded-full px-2 py-0.5`}>15+</span>

                                        </li>

                                        <li className={`flex items-center justify-between px-2 py-1 rounded-full transition ${pathname.includes("/todoList/today") ? "bg-gray-300 " : "hover:text-green-600"}`}>
                                            <Link href="/todoList/today">
                                                <div className="flex items-center space-x-3">
                                                    <FormatListBulletedIcon className="h-5 w-5" />
                                                    <span>Today</span>
                                                </div>
                                            </Link>
                                            <span className={`text-xs ${pathname.includes("/todoList/today") ? "bg-sky-50 " : " bg-gray-300"}  rounded-full px-2 py-0.5`}>8</span>
                                        </li>

                                        <li className={`flex items-center justify-between px-2 py-1 rounded-full transition ${pathname.includes("/todoList/calendar") ? "bg-gray-300 " : "hover:text-green-600"}`}>
                                            <Link href="/todoList/calendar">
                                                <CalendarMonthIcon className="h-5 w-5 mr-3" />
                                                <span>Calendar</span>
                                            </Link>
                                        </li>

                                        <li className="flex items-center px-2 py-1 rounded-full transition hover:text-green-600">
                                            <StickyNote2Icon className="h-5 w-5 mr-3" />
                                            <span>Sticky Wall</span>
                                        </li>
                                    </ul>
                                </div>

                                <div className="pl-2 mb-5">
                                    <h2 className="text-lg font-bold mb-3">Lists</h2>
                                    <ul className="gap-2 text-sm pl-[10%]">
                                        <li className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 rounded-full py-2">
                                            <span className="w-4 h-3 rounded-full bg-red-500"></span>
                                            <span>Work</span>
                                        </li>
                                        <li className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 rounded-full py-2">
                                            <span className="w-4 h-3 rounded-full bg-green-500"></span>
                                            <span>Personal</span>
                                        </li>
                                        <li className="flex items-center space-x-1 cursor-pointer hover:bg-gray-100 rounded-full py-2">
                                            <span className="w-4 h-3 rounded-full bg-blue-500"></span>
                                            <span>Study</span>
                                        </li>
                                    </ul>

                                    {/* Add new list */}
                                    <button className="flex pl-[10%] items-center space-x-2 text-sm text-gray-600 hover:text-green-600 mt-4">
                                        <AddCircleOutlineIcon className="h-5 w-5" />
                                        <span>Add new list</span>
                                    </button>
                                </div>

                            </div>
                            {/* <div className="absolute bottom-6 left-0 w-full px-6"> */}
                            <div className="h-[10%] gap-4 flex flex-col justify-end">
                                <div>
                                    <button className="w-full flex items-center space-x-3 text-xl text-gray-600 hover:text-green-600">
                                        <SettingsIcon className="h-5 w-5" />
                                        <span>Settings</span>
                                    </button>
                                </div>
                                <div>
                                    <button className="w-full flex items-center space-x-3 text-xl text-gray-600 hover:text-green-600 mt-1">
                                        <ExitToAppIcon className="h-5 w-5" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='h-full py-[20px]'>
                            <div className="rounded-4xl items-start justify-self-center">
                                <button
                                    onClick={() => setCollapsed(!collapsed)}
                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-300 shadow">
                                    <DehazeIcon />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Content */}
                <div className="h-full w-full">
                    {children}
                </div>
            </div>
        </main>
    );
}

export default authLayout
