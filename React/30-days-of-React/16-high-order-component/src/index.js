import React from 'react';
import ReactDOM from 'react-dom';

const Button = ({ style, text, onClick }) => (
  <button onClick={onClick} style={style}>{text}</button>
);

const composeButton = (ChildComponent, type) => {
  const btnStyleMap = {
    primary: {
      color: 'cyan'
    },
    success: {
      color: 'navblue'
    },
    error: {
      color: 'red'
    },
    pending: {
      color: 'cyan'
    },
  };
  const btnStyle = btnStyleMap[type];
  return (props) => (
    <ChildComponent {...props} style={btnStyle}></ChildComponent>
  );
}

const PrimaryButton = composeButton(Button, 'primary');
const SuccessButton = composeButton(Button, 'success');
const ErrorButton = composeButton(Button, 'error');
const PendingButton = composeButton(Button, 'pending');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  handleClick = (type) => {
    console.log(`Hi, this is ${type} button`);
  }
  render() {
    return (
      <React.Fragment>
        <p>base button</p>
        <Button text="base" onClick={() => console.log('this is base')} />
        <PrimaryButton text="primary" onClick={() => this.handleClick('primary')} />
        <SuccessButton text="success" onClick={() => this.handleClick('success')} />
        <ErrorButton text="error" onClick={() => this.handleClick('error')}/>
        <PendingButton text="pending" onClick={() => this.handleClick('pending')} />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
