import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';
import './index.css';

const Home = () => <h1>Welcome Home Page</h1>

const About = () => <h1>Welcome About Page</h1>

const Detail = () => <h1>Welcome Detail Page</h1>

// 添加 NavLink
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">

          <NavLink to="/home">home</NavLink>
          <NavLink to="/detail">detail</NavLink>
          <NavLink to="/about">about</NavLink>
          <NavLink to="/404">404</NavLink>

          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/detail" component={Detail} />
          </Switch>

        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
