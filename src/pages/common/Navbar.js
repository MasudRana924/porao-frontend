import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CgProfile } from "react-icons/cg";
import { CiChat1} from "react-icons/ci";
import { PiSignOutThin } from "react-icons/pi";
import { logout } from '../redux/reducers/auth/authSlice';
import { CgMenuGridO } from "react-icons/cg";
const Navbar = () => {
    const dispatch = useDispatch();
    const { token, user } = useSelector(
        (state) => state.user
    );
    const [active, setActive] = useState(false)
    const showMenu = () => {
        setActive(!active)
    }
    const handleLogout = () => {
        dispatch(logout());
        setActive(false);
    };
    return (
        <nav className="w-full md:w-3/4 mx-auto relative  ">
            <div className="container  py-4 mx-auto">
                <div className="flex lg:items-center justify-between">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="text-white text-xl md:text-3xl font-semibold font-serif nav-text">
                            Porao
                        </Link>
                    </div>
                    <div className=" hidden md:flex absolute inset-x-0 z-20 w-full px-6 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center">
                        <div className="flex flex-col -mx-6 lg:flex-row lg:items-center lg:mx-8">
                            <Link to="#" className="px-3 py-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Contact Us</Link>
                            <Link to="#" className="px-3 py-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">About Us</Link>
                            <Link to="/components/teachersstore" className="px-3 py-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Find Tutor</Link>
                            {
                                token && user?.role === "teacher" ?
                                    <Link to="/tutor/create/post" className="px-3 py-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Create a post</Link> : <Link to="/auth/tutor/register" className="px-3 py-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Become a Tutor</Link>
                            }

                        </div>
                        {token ? (
                            <button
                                type="button"
                                className={
                                    token
                                        ? "relative flex rounded-full  text-sm focus:outline-none focus:ring-none focus:ring-offset-2 focus:ring-offset-gray-800 bg-white p-2"
                                        : "w-24 "
                                }
                                id="user-menu-button"
                                aria-expanded="false"
                                aria-haspopup="true"
                                onClick={showMenu}
                            >
                                {token ? (
                                    'MR'
                                ) : (
                                    <div>
                                        <p className="text-xs text-white">
                                            {" "}
                                            Sign in / Register
                                        </p>
                                    </div>
                                )}
                            </button>
                        ) : (
                            <div className="flex items-center mt-4 lg:mt-0">
                                <Link to="/auth/student/login">
                                    <h3 className="px-3 py-2 mx-3 mt-2 text-white transition-colors duration-300 transform rounded-md lg:mt-0 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Signin</h3></Link>
                            </div>
                        )}
                        {token && (
                            <div
                                className={
                                    active
                                        ? "absolute right-0 z-10 mt-56 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                        : "hidden"
                                }
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="user-menu-button"
                                tabindex="-1"
                            >
                                <div className="flex px-4 py-2 gap-2">
                                    <CgProfile className=" text-2xl text-gray-700 text-start" />
                                    <Link
                                       to={user?.role === "teacher" ? "/tutor/profile" : user?.role === "admin" ? "/admin/profile" : "/user/profile"}
                                        className="block text-md font-semibold text-gray-700 capitalize  text-start"
                                        role="menuitem"
                                        tabindex="-1"
                                        id="user-menu-item-0"
                                        onClick={() => setActive(false)}
                                    >
                                        Profile
                                    </Link>
                                </div>
                                <div className="flex px-4 py-2 gap-2">
                                    <CiChat1 className=" text-2xl text-gray-700 text-start" />
                                    <Link
                                        to="/user/messages"
                                        className="block text-md font-semibold text-gray-700 capitalize text-start"
                                        role="menuitem"
                                        tabindex="-1"
                                        id="user-menu-item-0"
                                        onClick={() => setActive(false)}
                                    >
                                        Messages
                                    </Link>
                                </div>
                                <div className="flex  px-4 py-2 gap-2 mb-4">
                                    <PiSignOutThin className=" text-2xl text-gray-700 text-start" />
                                    <Link
                                        to=""
                                        className="block text-md font-semibold text-gray-700 capitalize text-start"
                                        role="menuitem"
                                        tabindex="-1"
                                        id="user-menu-item-0"
                                        onClick={handleLogout}
                                    >
                                        Signout
                                    </Link>
                                </div>

                            </div>
                        )}

                    </div>
                    {/* small devices */}
                    <CgMenuGridO className="flex md:hidden  text-white text-2xl"/>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;