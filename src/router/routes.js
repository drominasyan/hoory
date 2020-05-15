import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import First  from '../Page/First';
import Second  from '../Page/Second';
import Tird   from '../Page/Third';
import Forth from '../Page/Forth';
import Fifth  from '../Page/Fifth';

const  WizardRouters = () => {
  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route
          exact
          path="/first"
          render={() => <First />}
        />
        <Route
          exact
          path="/second"
          render={() => <Second />}
        />
        <Route
          exact
          path="/tird"
          render={() => <Tird />}
        />
        <Route
          exact
          path="/fourth"
          render={() => <Forth />}
        />
        <Route
          exact
          path="/fifth"
          render={() => <Fifth />}
        />
				<Route path="/" render={() => (<Redirect to={{ pathname: `/first` }} />)} />
      </Switch>
    </Suspense>
  );
}

export default WizardRouters;
