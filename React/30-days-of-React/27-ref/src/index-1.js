import React, { useRef } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  const ref = useRef(null);

  const onClick = () => {
    console.log(ref.current.value);
  };

  return (
    <div className="App">
      <p>Get input value</p>
      <input ref={ref} type="text" />
      <br/>
      <button onClick={onClick}>Get input value</button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
