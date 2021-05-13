import React from 'react';

const Component = (props) => {
  console.log(props);
  return (
    <div>
      {props.children}
      Oops There is error.
    </div>
  );
};

export default Component;
