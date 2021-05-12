import React from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

import Accessibility from './components/Accessibility';
import CodeSpliting from './components/CodeSpliting';

const NotFound = () => <h1>The page is missing.</h1>;

const App = () => {

  return (
    <div className="app">
      <Router>
        <NavLink to="/accessibility">accessibility</NavLink>
        <NavLink to="/codeSpliting">codeSpliting</NavLink>

        <Switch>
          <Route path="/accessibility" component={Accessibility} ></Route>
          <Route path="/codeSpliting" component={CodeSpliting} ></Route>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
