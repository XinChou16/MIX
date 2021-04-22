import ReactDOM from 'react-dom';

function App() {
  const list = ['Apple', 'Microsoft', 'Amazon'];

  return (
    <ul>
      {list.map(item => <li key={item}>{item}</li>)}
    </ul>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
