import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentAttendanceHistry } from '../../../../redux/reducers/attendance/createAttendanceSlice';
import { BarChart } from '@mui/x-charts';

const AttendanceHistry = () => {
    const { token } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudentAttendanceHistry({ token }));
  }, [dispatch, token]);
  const { data } = useSelector((state) => state.attendance.studentAttendancesHistry);
  console.log(data)
    return (
        <div>
            
        </div>
    );
};

export default AttendanceHistry;