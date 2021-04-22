import React from 'react';

const Main = ({ brands }) => {
  return (
    <main>
      <ul>
        {brands.map(brand => <li key={brand}>{brand}</li>)}
      </ul>
    </main>
  );
};

export default Main;
