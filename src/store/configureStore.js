import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { default as app, initialState } from '../reducers';

const str = '../reducers';

export default function configureStore() {
  const middleware = [thunk];
  middleware.push(createLogger());

  const store = createStore(
    app,
    initialState,
    applyMiddleware(...middleware)
  );

  module.hot.accept(str, () => {
    const nextRootReducer = require('../reducers');
    store.replaceReducer(nextRootReducer);
  });

  return store;
};

const Store = configureStore();

export { Store };
