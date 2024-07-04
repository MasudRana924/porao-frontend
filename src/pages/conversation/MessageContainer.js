import React from 'react';
import { useSelector } from 'react-redux';
import conversationImg from '../../assets/conversation.jpg'
const MessageContainer = () => {
    const { selectedTeacher } = useSelector((state) => state.enrolledTeachers);
    return (
        <div>
            {
                selectedTeacher ? <div></div>:<div className=' w-3/4 mx-auto flex justify-center items-center'>
                    <div>
                    <h2 className='text-xl mt-16 mb-8'>Please start a conversation</h2>
                    <img  src={conversationImg} alt="" className=' w-3/4 mx-auto'/>
                    </div>
                </div>
            }
        </div>
    );
};

export default MessageContainer;