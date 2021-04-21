import ReactDOM from 'react-dom';

const headerStyle = {
  textAlign: 'center',
  color: '#69f'
};
const Header = () => (
  <header style={headerStyle}>
    WelCome to React
  </header>
);

const Main = () => (
  <main>
    1
  </main>
);

const Footer = () => (
  <footer>
    2
  </footer>
);

const App = () => (
  <div>
    <Header />
    <Main />
    <Footer />
  </div>
);

// render
ReactDOM.render(<App />, document.getElementById('root'));
