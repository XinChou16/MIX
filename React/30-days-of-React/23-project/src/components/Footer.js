import React, { useEffect } from 'react';

export default function Footer(props) {
  useEffect(() => {
    console.log('footer-useEffect');
  });

  return (
    <footer className="footer">
      <p>
        Powered By {props.name}
      </p>
      <p> ❤ 2016 - 2021</p>
    </footer>
  );
}
