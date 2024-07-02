import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentAttendanceHistry,
  fetchStudentBatchAttendance,
} from "../../../../redux/reducers/attendance/createAttendanceSlice";
import { BarChart } from "@mui/x-charts";
import { fetchStudentEnrollment } from "../../../../redux/reducers/enrollment/teacherBookSlice";
import { useState } from "react";
import { fetchAttendanceByBatchId } from "../../../../redux/reducers/attendance/filterStudentAttendanceApi";

const AttendanceHistry = () => {
  const { token } = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStudentAttendanceHistry({ token }));
    dispatch(fetchStudentEnrollment({ token }));
  }, [dispatch, token]);
  const { data } = useSelector(
    (state) => state.attendance.studentAttendancesHistry
  );
  const { myEnrollments } = useSelector((state) => state.enrollment);
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(4);
  const handleSearchClick = () => {
    const batchId = selectedBatch;
    console.log("batch", batchId);
    dispatch(fetchStudentBatchAttendance({ token,batchId }));
    dispatch(fetchAttendanceByBatchId({ batchId, page, perPage,token }));

  };
  return (
    <div>
      <p className="text-start text-lg font-semibold text-gray-700 capitalize dark:text-white p-16">
        Attendance History
      </p>
      <div className="w-2/4 justify-start flex pl-16">
        <select
          onChange={handleBatchChange}
          value={selectedBatch}
          className="h-10 w-full border border-gray-500 outline-none"
        >
          <option value="">Select a batch</option>
          {myEnrollments.map((batch) => (
            <option key={batch.id} value={batch.batchInfo.batchId}>
              {batch.batchInfo.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleSearchClick}
          className="h-10 w-full bg-black text-white"
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default AttendanceHistry;
