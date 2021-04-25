import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  myName = React.createRef();
  state = {

  }
  handleChange = () => {
    console.log(this.myName.current.value);
    console.log(this.myName)
  }
  render() {
    return (
      <div>
        cool
        <input
          name="myName"
          type="text"
          onChange={this.handleChange}
          ref={this.myName}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
