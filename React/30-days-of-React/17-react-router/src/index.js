import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, NavLink, Redirect, Prompt } from 'react-router-dom';
import './index.css';

const Home = () => <h1>Welcome Home Page</h1>

const About = () => <h1>Welcome About Page</h1>

const Detail = () => <h1>Welcome Detail Page</h1>

const NotFound = () => <h1>The page is not found</h1>

const FruitsItem = (props) => <p>{props.location.pathname}</p>

const Fruits = (props) => {
  const path = props.location.pathname;
  console.log(props);

  return (
    <>
      <NavLink to="/fruits/apple">apple</NavLink>
      <NavLink to="/fruits/banana">banana</NavLink>
      <Switch>
        <Route exact path="/fruits" component={() => 'choose fruits'}/>
        <Route path={path} component={FruitsItem}/>
      </Switch>
    </>
  );
}

const RedirectHome = () => <Redirect to="/home" />

// 添加 prompt
class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Prompt message="Are U sure want to leave" />

          <NavLink to="/home">home</NavLink>
          <NavLink to="/detail">detail</NavLink>
          <NavLink to="/about">about</NavLink>
          <NavLink to="/404">404</NavLink>
          <NavLink to="fruits">fruits</NavLink>

          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/detail" component={Detail} />
            <Route path="/about" component={About} />
            <Route path="/fruits" component={Fruits} />
            <Route exact path="/" component={RedirectHome} />
            <Route component={NotFound} />
          </Switch>

        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
