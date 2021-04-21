import ReactDOM from 'react-dom'

const Header = (props) => (
  <header>
    <p>Color is: {props.color}</p>
    <button onClick={props.onClick}>click</button>
  </header>
);

const App = () => {
  const color = 'blue';
  const sayColor = () => {
    console.log(color, this);
  };

  return (
    <div>
      <Header color={color} onClick={sayColor}/>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
