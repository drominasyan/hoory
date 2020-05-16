import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Router, Redirect } from 'react-router-dom';
import Root from '../containers/Root';
import ToDoList from '../Page/ToDoList'

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => {

  if (isLoggedIn && rest.path === '/' && rest.exact) {
    return (
      <Route
        {...rest}
        render={() => (
          <Redirect to={{ pathname: '/dashboard' }} />
        )}
      />
    );
  }

  return (
    <Route
      {...rest}
      render={props => isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
              pathname: '/signin',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

const PublicRoutes = (props) => {

    const { history } = props;


    return (
      <Router history={history}>
        <Switch>
          <RestrictedRoute
            exact
            path="/dashboard"
            component={ToDoList}
          />
          <Route path="/" component={Root} />
        </Switch>
      </Router>
    );
  }

PublicRoutes.propTypes = {
    history : PropTypes.object.isRequired,
};

export default PublicRoutes;
