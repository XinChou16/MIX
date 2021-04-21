import ReactDOM from 'react-dom';

const DEFAULT_DATA = {
  date: '2021-04-21',
  num: 2
};

const Header = (props) => (
  <header>
    <p>Color is: {props.color}</p>
    <button onClick={props.onClick}>click</button>
  </header>
);

const Main = ({ date, num }) => (
  <main>
    <p>data is: {date}</p>
    <p>num is: {num}</p>
  </main>
);

const App = () => {
  const color = 'blue';
  const sayColor = () => {
    console.log(color, this);
  };
  const { date, num } = DEFAULT_DATA;

  return (
    <div>
      <Header color={color} onClick={sayColor}/>
      <Header color={color} onClick={() => console.log('cyan')}/>
      <Main  date={date} num={num} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
