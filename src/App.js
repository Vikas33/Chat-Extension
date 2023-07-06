import { useState } from 'react';
import './App.css';
import UserInput from './components/UserInput';
import { persistor } from './utils/store';
import { useDispatch } from 'react-redux';
import { clearChat } from './utils/chatSlice';

function App() {
  const [chatOn, setChatOn] = useState(true);
  const dispatch = useDispatch();

  const buttonState = chatOn ? 'bg-[#32cbc3]  ' : 'bg-[#c6c8cd85]';

  const handler = (e) => {
    e.preventDefault();
    dispatch(clearChat());
    setChatOn(!chatOn);
  };

  return (
    <div>
      <div className='h-12 bg-[#F2F2F2] absolute top-0'>
        <button onClick={handler} className={`${buttonState} h-10 cursor-pointer w-80`}>
          <h2 className='text-lg font-semibold font-serif'>Chat with ChatGPT</h2>
        </button>
      </div>
      <div className='w-full mt-4'>
        {chatOn ? (
          <div className='h-56'>
            <UserInput />
          </div>
        ) : (
          <div>
            <p className='text-[#BE4545] font-semibold w-full text-lg mt-20 ml-6'>Solve your queries with ChatGPT!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
