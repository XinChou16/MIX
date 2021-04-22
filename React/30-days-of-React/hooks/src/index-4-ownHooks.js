import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function useFriendStatus(initStatus) {
  const [online, setOnline] = useState(initStatus);

  useEffect(() => console.log('online change', {online}));

  return [online, setOnline];
}

const App = () => {
  const [online, setOnline] = useFriendStatus(true);

  return (
    <div>
      <p>Status: {online ? 'online' : 'offline'}</p>
      <button onClick={() => setOnline(!online)}>
        Change status
      </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
