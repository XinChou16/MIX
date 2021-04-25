import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      luckyNum: '123'
    }
    console.log('constructor');
    setTimeout(() => {
      this.setState({ luckyNum: 123 });
    }, 2000);
  }
  static getDerivedStateFromProps(props, state) {
    // console.log({ props, state });
    console.log('01-getDerivedStateFromProps');
    return {...state};
  }
  shouldComponentUpdate() {
    console.log('02-shouldComponentUpdate');
    return true;
  }
  componentDidUpdate() {
    console.log('05-componentDidUpdate');
  }
  getSnapshotBeforeUpdate() {
    console.log('04-getSnapShotBeforeUpdate');
    return null;
  }
  render() {
    console.log('03-render');
    return (
      <div>
        {this.state.luckyNum}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
