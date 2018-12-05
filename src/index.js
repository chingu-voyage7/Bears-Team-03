import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// Middleware thanks to which redux is allowed to dispatch async function
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import rootReducer from './redux/reducers/rootReducer';

// The main component connected with redux
import ConnectedApp from './containers/ConnectedApp';

// Here the redux store is created using the root reducer and the thunk middleware
const store = createStore(rootReducer, applyMiddleware(thunk));
/*
The main component is wrapped into the Provider Component
thanks to which the store is passed down to all components
 */
ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
