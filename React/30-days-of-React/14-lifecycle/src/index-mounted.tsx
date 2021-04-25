import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('01-constructor');
  }
  static getDerivedStateFromProps(props, state) {
    // console.log({ props, state });
    console.log('02-getDerivedStateFromProps');
    return null;
  }
  componentDidMount() {
    console.log('04-componentDidMount');
  }
  render() {
    console.log('03-render');
    return (
      <div>
        123
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
