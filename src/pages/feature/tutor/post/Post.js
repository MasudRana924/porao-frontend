import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTutionPost } from '../../../redux/reducers/tuionPost/tuitionPostSlice';
import { formatDate } from '../../../redux/utilities/helper';
const Post = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTutionPost());
    }, [dispatch]);
    const { posts } = useSelector((state) => state.posts);
    console.log(posts);
    return (
        <div className="w-full  mx-auto">
            <div className=" grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 xl:gap-x-8 m-4">
                {
                    posts?.map((post) =>
                    (<div className="flex gap-4 border border-gray-900 bg-gray-900 rounded-lg p-4 ">
                        <div className="w-1/4">
                            {/* <Avatar
                                size={{ xs: 24, sm: 32, md: 40, lg: 48, xl: 54, xxl: 54 }}
                                icon={post?.teacherInfo?.image}
                            /> */}
                              <img className="object-cover w-12 h-12 rounded-full" src={post?.teacherInfo?.image} alt=""></img>
                        </div>
                        <div className="w-full">
                            <h1 className="text-white font-mono text-xl text-start">{post?.teacherInfo?.name}</h1>
                            <h1 className="text-white text-start mt-4 font-sans">{post?.description.slice(0, 50)}</h1>
                            <h1 className="text-white text-xs text-start font-mono mt-2">{formatDate(post?.createdAt)}</h1>
                        </div>
                    </div>)
                    )
                }
            </div>
        </div>
    );
};

export default Post;