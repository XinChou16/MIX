import React from 'react';
import ReactDOM from 'react-dom';
import useFetch from './useFetch';

const App = () => {
  const url = 'https://restcountries.eu/rest/v2/all';
  const data = useFetch(url);

  return (
    <div>
      <p>Countries Group</p>
      <p>There is {data.length} Countries in the world.</p>
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('root'));
