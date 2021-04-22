import React from 'react';
import Header from './components/Header';
import Main from './components/Main';

class App extends React.Component {
  state = {
    brands: ['Apple', 'Microsoft', 'Amazon', 'Facebook']
  }

  render() {
    return (
      <>
        <Header />
        <Main brands={this.state.brands} />
      </>
    )
  }
}

export default App;
