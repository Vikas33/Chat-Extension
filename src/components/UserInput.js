import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getReply, updateChat } from '../utils/chatSlice';

const UserInput = () => {
  const [input, setInput] = useState('');

  const dispatch = useDispatch();
  const chatStates = useSelector((state) => state.chat);

  useEffect(() => {
    const item = document.getElementById('bottom-point');
    item.scrollIntoView();
  }, [chatStates]);

  const addHandler = (e) => {
    e.preventDefault();
    if (input !== '') {
      const message = {
        message: input,
        from: 'me',
      };

      dispatch(updateChat(message));

      setTimeout(() => {
        dispatch(getReply(input));
      }, 1000);
    }
    setInput('');
  };

  return (
    <div>
      <div className='absolute top-12 w-80 h-56 pb-1 overflow-y-auto'>
        {!!chatStates?.chat?.length &&
          chatStates.chat.map((item, index) => (
            <div key={index} className={item.from === 'me' ? ' w-24 mt-3 bg-[#F0FFFF] translate-x-52 break-words px-2 border border-[#F0FFFF] rounded-2xl' : 'bg-[#F0F8FF] w-24 break-words px-2 border border-[#F0F8FF] rounded-2xl ml-2'}>
              <span className='font-serif'>{item.message}</span>
            </div>
          ))}

        {chatStates?.loading && (
          <ul>
            <li className='italic text-gray-400'>Typing...✍🏼</li>
          </ul>
        )}
        <div id={'bottom-point'}></div>
      </div>
      <div className='flex justify-center mt-2 w-80 h-8 bg-[#F2F2F2] absolute top-[272px]'>
        <input
          className='outline-0 border w-56 border-black border-r-0 p-1 pl-3 rounded-2xl rounded-tr-none rounded-br-none'
          type='text'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder='Ask me..'
        />
        <button onClick={addHandler} className=' cursor-pointer border border-black border-l-0 rounded-2xl rounded-tl-none rounded-bl-none px-2'>
          🔍
        </button>
      </div>
    </div>
  );
};

export default UserInput;
