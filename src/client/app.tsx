import * as React from "react";
import * as ReactDOM from "react-dom";
import Search from "./Search";
import './style/style.scss';
import SearchButton from "./SearchButton";
import Button from "./Button";
import LoadingPlaceholder from "./LoadingPlaceholder";
import Gallery from "./Gallery";

console.log(document.getElementById("react-root"));
ReactDOM.render((
    <div className='app-container no-resultss'>
        <div className="top-container">
            <div className="inputs-logo-wrapper">
                <div className="logo-container">CelesteBank</div>
                <div className="inputs-container">
                    <Search placeholder='Rechercher une image...'/>
                    {/*<SearchButton/>*/}
                    <div className='btns-container'>
                        <Button text='Recherche'/>
                        <Button text="J'ai de la chance"/>
                    </div>
                </div>
            </div>
        </div>
        <div className='results-container'>
            <Gallery/>
        </div>
    </div>
), document.getElementById("react-root"));
