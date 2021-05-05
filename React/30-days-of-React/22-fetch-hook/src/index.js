import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Country = (props) => (
  <div style={{borderBottom: '1px solid cyan'}}>
    <p>name: {props.country.name}</p>
    <p>population: {props.country.population}</p>
    <p>numericCode: {props.country.numericCode}</p>
  </div>
);

const getCountries = () => {
  const url = 'https://restcountries.eu/rest/v2/all';
  return fetch(url)
    .then(res => res.json());
};

const App = () => {
  const [country, setCountry] = useState([]);

  const fetchData = () => {
    getCountries().then(list => {
      setCountry(list.slice(0, 3));
    });
  };

  useEffect(() => {
    console.log('use-effect');

    fetchData();
  }, []);

  return (
    <div className="App">
      <p>There is {country.length} countries</p>
      {
        country.map((item, index) => (
          <Country key={index} country={item} />
        ))
      }
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
