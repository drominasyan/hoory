import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';

import reducers from './reducers';
import rootSaga from './sagas';

const history        = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middlewares    = [sagaMiddleware];


const composeEnhancers = (
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  )
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true, traceLimit: 25 })
    : compose;

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  composeEnhancers(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(rootSaga);
export { store, history };
