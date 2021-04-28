import React from 'react';
import ReactDOM from 'react-dom';

const Country = (props) => (
  <div style={{borderBottom: '1px solid cyan'}}>
    <p>name: {props.country.name}</p>
    <p>population: {props.country.population}</p>
    <p>numericCode: {props.country.numericCode}</p>
  </div>
);

class App extends React.Component {
  state = {
    countries: []
  }
  componentDidMount() {
    console.log('mounted');
    const url = 'https://restcountries.eu/rest/v2/all';
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data.slice(0, 3));
        this.setState({
          countries: data.slice(0, 3)
        });
      });
  }
  render() {
    return (
      <div className="App">
        <p>There is {this.state.countries.length} countries</p>
        {
          this.state.countries.map((item, index) => (
            <Country country={item} key={index} />
          ))
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
