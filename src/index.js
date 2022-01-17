// External imports
import React from "react";
import { render } from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
// import thunk from "redux-thunk";
// Local imports
import App from "./App";
import rootReducer from "./store/reducers/index";
import rootSaga from './store/saga'
import watchGetUser from './store/saga'
import { composeWithDevTools } from 'redux-devtools-extension';

// Assets
import "./index.css";

// const store = createStore(rootReducer, applyMiddleware(thunk));


const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  composeWithDevTools(
  applyMiddleware(sagaMiddleware))
)
sagaMiddleware.run(rootSaga)
render(
    <Provider store={store}>
        <App />
    </Provider>,

    document.getElementById("root")

);