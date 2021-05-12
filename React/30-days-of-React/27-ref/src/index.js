import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const ref = useRef(null);

  const onClick = () => {
    console.log('get', ref.current);
    const el = ref.current;
    el.style.border = 'none';
    el.style.padding = '6px 10px';
    el.style.color = '#fff';
    el.style.backgroundColor = '#f69';
  };

  return (
    <div className="App">
      <p ref={ref}>Hello</p>
      <br/>
      <button ref={ref} onClick={onClick}>Style mySelf, Coool~</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
