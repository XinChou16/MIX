import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.PureComponent {
  render() {
    return (
      <div>
        <p>Brands is: </p>
        <ul>
          {this.props.brands.map(
            brand => <li key={brand}>{brand}</li>
          )}
        </ul>
      </div>
    )
  }
}

function Button(props) {
  return <button onClick={props.onClick}>init brands</button>;
}

class App extends React.Component {
  state = {
    brands: []
  }

  initBrands() {
    this.setState({
      brands: ['Apple', 'Microsoft']
    });
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.initBrands()}/>
        <Main brands={this.state.brands} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
