import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import './style/main.css';

const getCountries = () => {
  const url = 'https://restcountries.eu/rest/v2/all';
  return fetch(url)
    .then(res => res.json());
};

const App = () => {
  const [country, setCountry] = useState([]);
  const [name] = useState('Cool Chou');

  const fetchData = (len = 3) => {
    return getCountries().then(list => list.slice(0, len));
  };

  useEffect(() => {
    console.log('app-useEffect');

    fetchData().then(list => {
      setCountry(list);
    });
  }, []);

  return (
    <React.Fragment>
      <Header count={country.length} />
      <Main country={country} />
      <Footer name={name} />
    </React.Fragment>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
