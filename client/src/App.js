import './App.css';
import MainPage from './components/MainPage';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import { store } from './utils/store';
import {Provider} from 'react-redux'


function App() {
  return (
    <Provider store={store}>
        <MainPage />
    </Provider>
  );
}

export default App;
