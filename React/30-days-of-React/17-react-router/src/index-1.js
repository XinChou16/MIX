import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './index.css';

// 基本路由
const Home = () => <h1>Welcome Home Page</h1>

const About = () => <h1>Welcome About Page</h1>

const Detail = () => <h1>Welcome Detail Page</h1>

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <a href="/home">home</a>
          <a href="/about">about</a>
          <a href="/detail">detail</a>
          <Route path="/home" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/detail" component={Detail} />
        </div>
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
