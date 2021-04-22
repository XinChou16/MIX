import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = {
    brands: ['Apple', 'Microsoft', 'XiaoMi', 'Logi'],
    show: false,
  }

  toggle = () => {
    const show = !this.state.show;
    this.setState({ show });
  }

  decrease = () => {
    const brands = this.state.brands.slice();
    brands.pop();
    this.setState({ brands });
  }

  render() {
    return (
      <div>
        <button onClick={this.toggle}>toggle status</button>
        {this.state.show && <p>Now U See Me</p>}
        <button onClick={this.decrease}>Decrease</button>
        {
          this.state.brands.length > 0
            ? this.state.brands.map(item => <p key={item}>{item}</p>)
            : <p>No brands at all</p>
        }
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
