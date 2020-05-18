import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Router } from 'react-router-dom';
import Root from '../containers/Root';
import Dashboard from '../Page/Dashboard';

// We need to create resctected routes in future to ckeck the user token.
const PublicRoutes = (props) => {

    const { history } = props;


    return (
      <Router history={history}>
        <Switch>
          <Route
            exact
            path="/dashboard"
            component={Dashboard}
          />
          <Route path="/" component={Root} />
        </Switch>
      </Router>
    );
  };

PublicRoutes.propTypes = {
    history : PropTypes.object.isRequired,
};

export default PublicRoutes;
