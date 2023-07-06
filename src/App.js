import { useState } from 'react';
import './App.css';
import UserInput from './components/UserInput';

function App() {
  const [chatOn, setChatOn] = useState(true);

  const buttonState = chatOn ? 'on-state' : 'off-state';

  const handler = (e) => {
    e.preventDefault();
    setChatOn(!chatOn);
  };

  return (
    <div>
      <button onClick={handler} className={buttonState}>
        Chat with ChatGPT
      </button>
      {chatOn ? (
        <UserInput />
      ) : (
        <div>
          <p className='start-text'>Solve your queries with ChatGPT!</p>
        </div>
      )}
    </div>
  );
}

export default App;
