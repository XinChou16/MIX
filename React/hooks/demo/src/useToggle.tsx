import './App.css';
import { useToggle } from 'cool-hooks';

const Demo1 = () => {
  const [flag, { toggle, setLeft, setRight }] = useToggle();

  return (
    <>
      <div>demo1</div>
      <div>
        <p>flag: {`${flag}`}</p>
        <button onClick={toggle}>toggle</button>
        <button onClick={setLeft} style={{margin: '0 8px'}}>setLeft</button>
        <button onClick={setRight}>setRight</button>
      </div>
    </>
  );
};

const Demo2 = () => {
  const [flag, { set, toggle, setLeft, setRight }] = useToggle('yes', 'no');

  return (
    <>
      <div>demo2</div>
      <div>
        <p>flag: {`${flag}`}</p>
        <button onClick={() => set('no')}>set no</button>
        <button onClick={toggle}>toggle</button>
        <button onClick={setLeft} style={{margin: '0 8px'}}>setLeft</button>
        <button onClick={setRight}>setRight</button>
      </div>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <h2>useToggle</h2>
      <Demo1 />

      <Demo2 />
    </div>
  );
}

export default App;
