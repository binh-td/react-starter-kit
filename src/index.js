import React from 'react';
import { render } from "react-dom";
import App from "App";
import { Provider } from 'react-redux';

import "index.scss";
import store from 'redux/store';

render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>, 
    document.getElementById("root")
);
