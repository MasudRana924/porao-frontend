import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../../../redux/utilities/helper';
import { fetchTutionPost } from '../../../../redux/reducers/tuionPost/tuitionPostSlice';
import { createEnrollmentTeacher, enrollmentClean } from '../../../../redux/reducers/enrollment/teacherBookSlice';
import { message } from 'antd';

const Post = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTutionPost());
    }, [dispatch]);

    const { posts } = useSelector((state) => state.posts);
    const { success, isLoading } = useSelector((state) => state.enrollment);
    const { token } = useSelector((state) => state.user.user);

    const handleClick = (batchId, teacherId) => {
        const data = {
            batchId,
            teacherId,
        };
        dispatch(createEnrollmentTeacher({ token, data }));
    };

    useEffect(() => {
        if (success) {
            message.success("Enrollment request successfuly sent");
            setTimeout(() => {
                dispatch(enrollmentClean());
            }, 1000); // Clean up after 1 second
        }
    }, [success, dispatch]);

    return (
        <div className="w-full mx-auto">
            <div className="flex justify-between">
                <h1 className="text-xl text-start text-gray-900 font-mono ">All Tuition Batches</h1>
                <p className="text-gray-900 text-sm font-mono ">see all</p>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 xl:gap-x-8 m-4">
                {posts?.map((post) => (
                    <div key={post.batchId} className="border border-gray-900 bg-gray-900 rounded-lg p-4">
                        <div className='flex gap-4'>
                            <div className="w-1/4">
                                {/* <img className="object-cover w-12 h-12 rounded-full" src={post?.teacherInfo?.image} alt=""></img> */}
                            </div>
                            <div className="w-full">
                                <h1 className="text-white font-mono text-xl text-start">{post?.teacherInfo?.name}</h1>
                                <p className='text-start text-white text-xs'>Subject Name : Math</p>
                                <p className='text-start text-white text-xs'>Batch Name : Mohuri</p>
                                <p className='text-start text-white text-xs'>Capacity  :{post.capacity}</p>
                                <p className='text-start text-xs text-white '>Days: {post.days.join(', ')}</p>
                            </div>
                        </div>
                        <div className='mt-4'>
                            <h1 className="text-start text-xs text-white">
                                <span className='text-blue-500'>Hey Students</span> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </h1>
                            <h1 className="text-white text-xs text-start font-mono mt-2">{formatDate(post?.createdAt)}</h1>
                            <button
                                onClick={() => handleClick(post.batchId, post?.teacherInfo?.teacherId)}
                                className={`bg-white text-gray-900 mt-4 w-2/4 h-10 justify-start ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Enrolling...' : 'Enroll'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Post;
