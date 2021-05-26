import React from 'react';

export default function Jsx() {
  const enableJsx = true;
  const fromJsx = <div className="cnt">from jsx</div>
  const fromFunc = React.createElement(
    'div',
    { className: 'cnt' },
    'from render function'
  );
  const Container = enableJsx ? fromJsx : fromFunc;

  return (
    <div>
      {Container}
    </div>
  );
}
