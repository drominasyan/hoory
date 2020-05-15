import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Router } from 'react-router-dom';
import Root from '../containers/Root';
import ToDoList from '../Page/ToDoList'

const PublicRoutes = (props) => {

    const { history } = props;

    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={() => <ToDoList />}
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
