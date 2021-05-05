import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const UseCount = () => {
  const [count, setCount] = useState(0);
  const [online, setOnline] = useState(false);

  // useEffect(() => {
  //   console.log('first useEffect');
  //   return () => console.log('first cleanup');
  // });

  // only mounted and unmounted
  useEffect(() => console.log('mounted or unmounted'), []);

  useEffect(() => {
    console.log(this, `Clicked ${count} times`);

    return () => console.log('cleanup');
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times.</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <p>Status: {online ? 'online' : 'offline'}</p>
      <button onClick={() => setOnline(!online)}>
        Change status
      </button>
    </div>
  );
};

ReactDOM.render(<UseCount />, document.getElementById('root'));
