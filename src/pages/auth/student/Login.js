import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Student.css'
import { createUserLogin } from "../../redux/reducers/auth/authSlice";
import { Alert } from 'antd';
const Login = () => {
    const dispatch = useDispatch();
    const [phone, setPhone] = useState("");
    const { errorMessage, success } = useSelector(
        (state) => state.user
    );
    const [isPhoneValid, setPhoneIsValid] = useState(false);
    const [password, setPassword] = useState("");
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createUserLogin({ phone, password }));
    };

    return (
        <main className="flex flex-1 justify-center items-center mt-24">
            <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="px-6 py-4">
                    <p className="mt-10 text-start text-gray-500 dark:text-gray-400 font-mono">
                        Login or create account
                    </p>
                    <form onSubmit={handleSubmit}>
                        <div className="w-full mt-8">
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
                                        // return "Invalid value: " + value + ", " + country.name;
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

                        <div className="flex items-center justify-between mt-4">
                            <Link
                                to="#"
                                className="font-mono text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500"
                            >
                                Forget Password?
                            </Link>

                            <button className="font-mono px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg  focus:outline-none ">
                                Sign In
                            </button>
                        </div>
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
                    <span className="font-mono text-sm text-gray-600 dark:text-gray-200">
                        Don't have an account?{" "}
                    </span>

                    <Link
                        to="/auth/student/register"
                        className="font-mono mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
                    >
                        Create
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default Login;