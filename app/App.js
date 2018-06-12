import React from 'react';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import ceburiloApp from './reducers';
import { checkLocationPermission } from './actions';
import RootNavigator from './config/navigator';

const store = createStore(ceburiloApp, applyMiddleware(thunk));
store.dispatch(checkLocationPermission());

const persistor = persistStore(store);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <RootNavigator />
    </PersistGate>
  </Provider>
);

export default App;
