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
  },
  {
    path: 'jsx',
    component: React.lazy(() => import('./components/Jsx'))
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
            {routes.map(route => (
                <Route key={route.path} path={'/' + route.path} component={route.component} ></Route>
            ))}
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
};

export default App;
