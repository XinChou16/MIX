import React from 'react';

/* NO Context */
const ThemeButton = (props) => <button disabled={props.theme==='dark'}>theme {props.theme}</button>
const Toolbar = (props) => <ThemeButton theme={props.theme} />

const NoContext = () => {
  return (
    <React.Fragment>
      <div>
        <Toolbar theme="dark" />
      </div>
    </React.Fragment>
  );
};

/* With Context */
const ThemeContext = React.createContext('light');

class ThemeButtonPlus extends React.Component {
  static contextType = ThemeContext;
  render() {
    return <button disabled={this.context === 'dark'}>{this.context}</button>
  }
}

const ToolbarPlus = () => <ThemeButtonPlus />;

class Context extends React.Component {
  render() {
    return (
      <ThemeContext.Provider value="light">
        <div>
          <ToolbarPlus />
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default Context;
