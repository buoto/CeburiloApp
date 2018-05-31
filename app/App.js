import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import ceburiloApp from './reducers';
import { checkLocationPermission } from './actions';
import RootNavigator from './config/navigator';

const store = createStore(ceburiloApp, applyMiddleware(thunk));
store.dispatch(checkLocationPermission());

const App = () => (
  <Provider store={store}>
    <RootNavigator />
  </Provider>
);

export default App;
