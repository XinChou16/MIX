import ReactDOM from 'react-dom'

const Header = (props) => (
  <header>
    <p>Color is: {props.color}</p>
  </header>
);

const App = () => (
  <div>
    <Header color='red' />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
