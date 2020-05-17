import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import First  from '../Page/First';
import Second  from '../Page/Second';
import Tird   from '../Page/Third';
import Forth   from '../Page/Forth';
import SignIn from '../Page/SignIn';

const  WizardRouters = () => {
  return (
    // Returning Route for wizard steps and signin (starting first)
    <Suspense fallback={<div />}>
      <Switch>
        <Route
          exact
          path="/1"
          component={First}
        />
        <Route
          exact
          path="/2"
          component={Second}
        />
        <Route
          exact
          path="/3"
          component={Tird}
        />
        <Route
          exact
          path="/4"
          component={Forth}
        />
        <Route
          exact
          path="/signin"
          component={SignIn}
        />
				<Route path="/" render={() => (<Redirect to={{ pathname: '/1' }} />)} />
      </Switch>
    </Suspense>
  );
};

export default WizardRouters;
