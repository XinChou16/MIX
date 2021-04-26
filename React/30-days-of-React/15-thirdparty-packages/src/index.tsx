import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import dayjs from 'dayjs';

class App extends React.Component {
  state = {
    curDate: ''
  }
  formatDate = () => {
    return dayjs().format('YYYY-MM-DD HH:mm:ss');
  }
  render() {
    return (
      <div>
        Now is {this.formatDate()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
