import { createStore, combineReducers, compose } from 'redux';
import { createBrowserHistory } from 'history';

import reducers from './reducers';

const history = createBrowserHistory();

const composeEnhancers = (
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  )
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : compose;

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  composeEnhancers(),
);

export { store, history };
