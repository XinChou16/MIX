import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  state = {
    name: '',
    age: '',
    brand: 'apple',
    content: '',
  }
  handleSubmit = () => {
    console.log('submit');
  }
  handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    console.log({ name, value, type, checked});
    this.setState({ [name]: value });
  }
  render() {
    return (
      <div className="app">
        <p>Events</p>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              name="name"
              type="text"
              placeholder="input my name"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <label htmlFor="name" />
          </div>
          <div>
            <input
              name="age"
              type="number"
              placeholder="input age"
              value={this.state.age}
              onChange={this.handleChange}
            />
            <label htmlFor="age" />
          </div>
          <div>
            <textarea
              name="content"
              rows={6}
              value={this.state.content}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              id="apple"
              name="brand"
              type="radio"
              value="apple"
              checked={this.state.brand === 'apple'}
              onChange={this.handleChange}
            />
            <label htmlFor="apple">apple</label>
            <input
              id="microsoft"
              name="brand"
              type="radio"
              value="microsoft"
              checked={this.state.brand === 'microsoft'}
              onChange={this.handleChange}
            />
            <label htmlFor="microsoft">microsoft</label>
          </div>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
