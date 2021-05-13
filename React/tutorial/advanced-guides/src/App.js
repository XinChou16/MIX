import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch, NavLink } from 'react-router-dom';

import Accessibility from './components/Accessibility';
import CodeSpliting from './components/CodeSpliting';

const Context = React.lazy(() => import('./components/Context'));

const NotFound = () => <h1>The page is missing.</h1>;

const routes = [
  {
    path: 'accessibility',
    component: Accessibility
  },
  {
    path: 'codeSpliting',
    component: CodeSpliting
  },
  {
    path: 'context',
    component: Context
  }
];

const App = () => {

  return (
    <div className="app">
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          {routes.map(route => (
            <NavLink key={route.path} to={'/' + route.path}>{route.path}</NavLink>
          ))}
          {/* <NavLink to="/context">context</NavLink> */}

          <Switch>
            <Route path="/accessibility" component={Accessibility} ></Route>
            <Route path="/codeSpliting" component={CodeSpliting} ></Route>
            <Route path="/context" component={Context} ></Route>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
