import React from 'react';
import ReactDOM from 'react-dom';

class Count extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times.</p>
        <button onClick={() => this.setState({ count: this.state.count + 1})}>
          CLick me
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Count />, document.getElementById('root'));
