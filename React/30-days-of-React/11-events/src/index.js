import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = {
    value: ''
  }
  handleClick = (event) => {
    console.log('click me %o', event);
  }
  handleCopy = (event) => {
    console.log('copy', event);
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    console.log({ name, value });
    this.setState({ value });
  }
  handleInput = (event) => {
    console.log('input', event.target.value);
  }
  handleFocus = (event) => {
    console.log('focus', event.target.name);
  }
  handleBlur = (event) => {
    console.log('blur', event.target.name);
  }

  render() {
    return (
      <React.Fragment>
        <p>Events group</p>
        <button onClick={this.handleClick}>Click event</button>
        <p onCopy={this.handleCopy}>Copy it</p>
        <input
          type="text"
          name="myInput"
          value={this.state.value}
          onChange={this.handleChange}
          onInput={this.handleInput}
          onBlur={this.handleBlur}
          onFocus={this.handleFocus}
        />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
