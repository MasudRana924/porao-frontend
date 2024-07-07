import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTutionBatch, updatePostClean } from '../../../../redux/reducers/tuionPost/uploadBatchSlice';
import { useEffect } from 'react';
import { message } from 'antd';
const PostForm = () => {
    const dispatch = useDispatch()
    const { token } = useSelector((state) => state.user.user);
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [days, setDays] = useState([]);
    const handleDayChange = (day) => {
        if (days.includes(day)) {
            setDays(days.filter((d) => d !== day));
        } else {
            setDays([...days, day]);
        }
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            description,
            subject,
            startTime,
            endTime,
            days,
        };
        dispatch(createTutionBatch({ token, data }))
    };
    const { success, isLoading } = useSelector((state) => state.uploadPost);
    useEffect(() => {
        if (success) {
            message.success("Batch Successfully Uploaded");
            dispatch(updatePostClean());
        }
    }, [dispatch, success]);
    return (
        <div className="w-3/4 xl:w-2/4 p-16">
            <h2 className="text-start text-2xl text-gray-900">Became a Home Tutor</h2>

            <form className=" gap-6 mt-20 " onSubmit={handleSubmit}>
                <div className='flex justify-between mt-4'>
                    <div>
                        <label className="text-start block mb-2 text-sm text-gray-600 dark:text-gray-200">Start Time</label>
                        <input type="text" placeholder="10.00 AM" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setStartTime(e.target.value)} />
                    </div>

                    <div>
                        <label className="text-start block mb-2 text-sm text-gray-600 dark:text-gray-200">End Time</label>
                        <input type="text" placeholder="11.00 PM" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setEndTime(e.target.value)} />
                    </div>
                </div>

                <div className='flex justify-between mt-4'>
                    <div className='w-full'>
                        <label className="text-start block mb-2 text-sm text-gray-600 dark:text-gray-200">Subject Name </label>
                        <input type="text" placeholder="Subject Name" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                            onChange={(e) => setSubject(e.target.value)} />
                    </div>
                </div>

                <div className='flex justify-between mt-4'>
                    <div className='text-start w-full'>
                        <input type="checkbox" value="Monday" onChange={() => handleDayChange('Monday')} /> Monday
                        <br />
                        <input type="checkbox" value="Tuesday" onChange={() => handleDayChange('Tuesday')} /> Tuesday
                        <br />
                        <input type="checkbox" value="Wednesday" onChange={() => handleDayChange('Wednesday')} /> Wednesday
                        <br />
                    </div>
                    <div className='text-start w-full'>
                        <input type="checkbox" value="Thursday" onChange={() => handleDayChange('Thursday')} /> Thursday
                        <br />
                        <input type="checkbox" value="Friday" onChange={() => handleDayChange('Friday')} /> Friday
                        <br />
                        <input type="checkbox" value="Saturday" onChange={() => handleDayChange('Saturday')} /> Saturday
                        <br />
                        <input type="checkbox" value="Sunday" onChange={() => handleDayChange('Sunday')} /> Sunday
                    </div>
                </div>
                <div>
                    <label className="text-start block mb-2 text-sm text-gray-600 dark:text-gray-200">Start Time</label>
                    <textarea type="text" placeholder="Write a description" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
                {isLoading ? (
                    <button className="font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500  ">
                        Loading
                    </button>
                ) : (
                    <button className="font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 ">
                        Upload
                    </button>
                )}
            </form>
        </div>
    );
};

export default PostForm;