import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const ref = useRef(null);

  const onClick = () => {
    console.log('focus');
    ref.current.focus();
  };

  return (
    <div className="App">
      <input ref={ref} type="text" />
      <br/>
      <button onClick={onClick}>Focus input</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
