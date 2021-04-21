import React from 'react';
import ReactDOM from 'react-dom';

const headerStyle = {
  textAlign: 'center',
  color: '#69f'
};

const appStyle = {
  textAlign: 'center'
};

const getRandom = () => {
  return Math.floor(Math.random() * 10 + 1);
};

const Skills = () => {
  const list = ['HTML', 'CSS', 'JS'];
  return list.map(item => (<li key={item}>{item}</li>));
};

const Header = () => (
  <header style={headerStyle}>
    WelCome to React
  </header>
);

const Main = () => (
  <main>
    <p>Your random num is: s
      <span>{getRandom()}</span>
    </p>
    <p>Skills</p>
    <Skills />
  </main>
);

const Footer = () => (
  <footer>
    2
  </footer>
);

const App = () => (
  <div style={appStyle}>
    <Header />
    <Main />
    <Footer />
  </div>
);

// render
ReactDOM.render(<App />, document.getElementById('root'));
