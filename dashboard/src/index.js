import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore } from 'redux'

import { Provider } from 'react-redux'
import { AuthContext, AuthContextProvider } from './context/authContext/AuthContext'

import rootReducer from './redux/reducers'

import './assets/boxicons-2.0.7/css/boxicons.min.css'
import './assets/css/grid.css'
import './assets/css/theme.css'
import './assets/css/index.css'
import "react-datepicker/dist/react-datepicker.css";

import App from './App';

const store = createStore(
  rootReducer
)

document.title = 'NiMet FTS'

ReactDOM.render(
  <Provider store={store}>
    <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
    </AuthContextProvider>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
