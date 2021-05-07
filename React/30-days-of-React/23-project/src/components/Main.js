import React, { useEffect } from 'react';

const Country = (props) => (
  <div style={{borderBottom: '1px solid cyan'}}>
    <p>name: {props.country.name}</p>
    <p>population: {props.country.population}</p>
    <p>numericCode: {props.country.numericCode}</p>
  </div>
);

const Main = (props) => {

  useEffect(() => {
    console.log('main use-effect');
  }, []);

  return (
    <div className="main">
      {
        props.country.map((item, index) => (
          <Country key={index} country={item} />
        ))
      }
    </div>
  );
};

export default Main;
