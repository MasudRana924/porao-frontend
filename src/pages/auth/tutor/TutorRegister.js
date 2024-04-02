import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { message, Alert } from 'antd';
import { createTeacherRegister } from "../../redux/reducers/auth/registerSlice";

const TutorRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success, errorMessage } = useSelector(
        (state) => state.register
    );
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [versityName, setVersityName] = useState("");
    const [expert, setExpert] = useState("");
    const [experience, setExperience] = useState("");
    const [isPhoneValid, setPhoneIsValid] = useState(false);
    const [password, setPassword] = useState("");
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createTeacherRegister({ name, email, phone, password, versityName, expert, experience }));
    };
    useEffect(() => {
        if (success) {
            message.info("Registration successful");
            const timerId = setTimeout(() => {
                navigate('/auth/tutor/login');
            }, 1000);
            return () => clearTimeout(timerId);
        }
    }, [success, navigate]);
    return (
        <main className=" flex flex-1 justify-center items-center mt-24">
            <div className="w-full max-w-md overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="px-6 py-4">
                    <p className="mt-10 text-start text-gray-500 dark:text-gray-400 font-mono">
                        Login or create account
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="flex justify-between gap-2">
                            <div className="w-full mt-4">
                                <input
                                    className="font-mono block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    type="text"
                                    placeholder="Full Name"
                                    aria-label="Full Name"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-full mt-4">
                                <input
                                    className="font-mono block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    type="text"
                                    placeholder="Versity Name"
                                    aria-label="Versity Name"
                                    onChange={(e) => setVersityName(e.target.value)}
                                    required
                                />
                            </div>

                        </div>
                        <div className="flex justify-between gap-2">
                            <div className="w-full mt-4">
                                <input
                                    className="font-mono block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    type="text"
                                    placeholder="Expert On"
                                    aria-label="Expert On"
                                    onChange={(e) => setExpert(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="w-full mt-4">
                                <input
                                    className="font-mono block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                    type="text"
                                    placeholder="Experience"
                                    aria-label="Experience"
                                    onChange={(e) => setExperience(e.target.value)}
                                    required
                                />
                            </div>

                        </div>
                        <div className="w-full mt-4">
                            <input
                                className="font-mono block w-full h-12 px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                type="Email"
                                placeholder="Email"
                                aria-label="Email"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="w-full mt-6">
                            <PhoneInput
                                country={"bd"}
                                inputProps={{
                                    name: "Phone",
                                    required: true,
                                    //   autoFocus: true,
                                }}
                                isValid={(value, country) => {
                                    if (value.match(/(^(\+880|880))[1|3-9]{1}(\d){9}$/)) {
                                        setPhoneIsValid(true);
                                        return true;
                                    } else {
                                        setPhoneIsValid(false);
                                        return "Invalid Phone";
                                    }
                                }}
                                onChange={(phone) => setPhone(phone)}
                                required
                            />
                        </div>

                        <div className="w-full mt-4">
                            <input
                                className="font-mono block w-full h-12 px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
                                type="password"
                                placeholder="Password"
                                aria-label="Password"
                                onChange={handlePasswordChange}
                                required
                            />
                        </div>

                        <button className="font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg ">
                            Register
                        </button>
                        {
                            errorMessage ? <Alert
                                message={errorMessage}
                                showIcon
                                type="error"
                                className="mt-4"
                            /> : null
                        }
                    </form>
                </div>

                <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-sm text-gray-600 dark:text-gray-200 font-mono">
                        Already have an account?{" "}
                    </span>

                    <Link
                        to="/auth/tutor/login"
                        className="font-mono mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                    >
                        Login
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default TutorRegister;