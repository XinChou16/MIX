import React, { Fragment } from 'react';

const Accessibility = (props) => {
  const textRef = React.createRef();
  console.log('textRef %o', textRef);
  const focus = () => textRef.current.focus();

  return (
    <ul>
      <ol>
        <h2>fragment</h2>
        <Fragment>
          this is fragment1
        </Fragment>
        <br></br>
        <>
          This is fragment2
        </>
      </ol>

      <ol>
        <h2>Input focus</h2>
        <input type="test" ref={textRef} />
        <button onClick={focus} >foucs</button>
      </ol>
    </ul>
  );
};

export default Accessibility;
