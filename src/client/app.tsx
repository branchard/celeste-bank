import * as React from "react";
import * as ReactDOM from "react-dom";
import './style/style.scss';
import store from "./store";
import {Provider} from 'react-redux';
import Layout from "./Layout";

ReactDOM.render((
    <Provider store={store}>
        <Layout/>
    </Provider>
), document.getElementById("react-root"));
