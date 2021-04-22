import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <div>
        Welcome to here, {this.props.name}
      </div>
    );
  }
}

class Footer extends React.Component {
  render() {
    return (
      <div>
        Power By React
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: 'Chou'
    };
  }
  render() {
    return (
      <div>
        <Main name={this.state.name} />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
