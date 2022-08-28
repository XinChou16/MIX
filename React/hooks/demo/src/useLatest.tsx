import './App.css';
import { useLatest } from 'cool-hooks';
import { useEffect, useState } from 'react';

const Demo = () => {
  const [count, setCount] = useState(0);
  const latestCountRef = useLatest(count);

  useEffect(() => {
    let timer = setInterval(() => {
      setCount(latestCountRef.current + 1);

      if (latestCountRef.current >= 5) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <p>count: {count}</p>
    </>
  );
};

function App() {
  return (
    <div className="App">
      <h2>useLatest</h2>
      <Demo />
    </div>
  );
}

export default App;
