import React from 'react';
import LeftSidebar from '../../../../components/teacher/LeftSidebar';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchStudentApprovedEnrollment, fetchStudentPendingEnrollment } from '../../../../redux/reducers/enrollment/studentEnrollmentSlice';
import { PieChart } from '@mui/x-charts/PieChart';
const StudentDashboard = () => {
    const { token } = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchStudentPendingEnrollment({ token }));
        dispatch(fetchStudentApprovedEnrollment({ token }));
    }, [dispatch, token]);
    const { pendingStatus, approvedStatus } = useSelector(state => state.enrollmentStatus);

    const pendingEnrollment = pendingStatus?.data?.length;
    const approvedEnrollment = approvedStatus?.data?.length;
    console.log(pendingEnrollment);
    const declinedJobs = 1;

    return (
        <div className='w-3/4  border border-gray-100'>
            <p className="text-start text-lg font-semibold text-gray-700 capitalize dark:text-white">Dashboard</p>
            <div className='mt-24'>
                <div className='w-2/4 border p-4'>
                <PieChart
                    series={[
                        {
                            data: [
                                { id: 0, value: pendingEnrollment, label: 'Pending' },
                                { id: 1, value: approvedEnrollment, label: 'Approved' },
                                { id: 2, value: declinedJobs, label: 'Rejected' },
                            ],
                        },
                    ]}
                    // width={400}
                    className='w-full'
                    height={200}
                />
                <p className=' text-xs text-center text-blue-500'>Enrollment Stats</p>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;