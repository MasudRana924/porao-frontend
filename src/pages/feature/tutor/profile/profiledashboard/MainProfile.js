import React from 'react';
import LeftSidebar from '../../../../../components/teacher/LeftSidebar';
import { Outlet } from 'react-router-dom';

const MainProfile = () => {
    return (
        <div className='flex w-3/4 mx-auto mt-24 border border-gray-100'>
            <div className='w-1/4 '>
            <LeftSidebar></LeftSidebar>
            </div>
            <div className='w-full bg-gray-100 p-16'>
            <Outlet />
            </div>
        </div>
    );
};

export default MainProfile;