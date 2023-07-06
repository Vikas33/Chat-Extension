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
      <div>
        {!!chatStates?.chat?.length &&
          chatStates.chat.map((item, index) => (
            <div key={index} className={item.from === 'me' ? 'my-chat' : 'bot-chat'}>
              <span>{item.message}</span>
            </div>
          ))}

        {chatStates?.loading && <li style={{ fontStyle: 'italic', color: 'GrayText' }}>Typing...✍🏼</li>}
        <div id={'bottom-point'}></div>
      </div>
      <div className='input-box'>
        <input
          className='text-area'
          type='text'
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          placeholder='Ask me..'
        />
        <button onClick={addHandler} className='search-btn'>
          🔍
        </button>
      </div>
    </div>
  );
};

export default UserInput;
