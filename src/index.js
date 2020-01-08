import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css'
import 'antd-mobile/dist/antd-mobile.css';  // or 'antd-mobile/dist/antd-mobile.less'
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './store/reducer'
import { PersistGate } from 'redux-persist/es/integration/react';
import storage from 'redux-persist/lib/storage';
import {persistStore, persistReducer} from 'redux-persist';




//创建store
const config = {
    key: 'root',
    storage: storage,
}

const storageReducer = persistReducer(config, reducer)

const store = createStore(storageReducer);

const persistor = persistStore(store)



ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>

            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
