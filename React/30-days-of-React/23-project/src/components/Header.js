import React, { useEffect } from 'react';

export default function Header(props) {
  useEffect(() => {
    console.log('header-useEffect');
  });

  return (
    <header className="header">
      There is {props.count} countries in this page
    </header>
  );
}
