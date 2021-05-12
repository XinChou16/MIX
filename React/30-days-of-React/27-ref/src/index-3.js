import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const ref = useRef(null);

  const onClick = () => {
    console.log('get', ref.current.textContent);
  };

  return (
    <div className="App">
      <p ref={ref}>Hello</p>
      <br/>
      <button onClick={onClick}>get text content</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
