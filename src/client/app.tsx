import * as React from "react";
import * as ReactDOM from "react-dom";
import Search from "./Search";
import './style/style.scss';
import SearchButton from "./SearchButton";
import Button from "./Button";
import LoadingPlaceholder from "./LoadingPlaceholder";
import Gallery from "./Gallery";
import store from "./store";
import {Provider} from 'react-redux';
import Layout from "./Layout";

console.log(document.getElementById("react-root"));
ReactDOM.render((
    <Provider store={store}>
        <Layout/>
    </Provider>
), document.getElementById("react-root"));
