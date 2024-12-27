import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './src/store';
import store from './src/store';
import Navigation from './src/screens/Navigation';

const App = () => (
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <Navigation />
    </PersistGate>
  </Provider>
);

export default App;