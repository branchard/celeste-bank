import * as React from "react";
import Search from "./Search";
import './style/style.scss';
import Button from "./Button";
import Gallery from "./Gallery";
import {connect} from 'react-redux';
import {actions} from './store/core';

class Layout extends React.Component<Props> {
    static mapStateToProps = (state: any) => ({
        pendingSearch: state.core.pendingSearch,
        photos: state.core.photos,
    });

    componentDidMount(): void {
        this.props.dispatch(actions.initRoute());
    }

    render() {
        return (
            <div
                className={`app-container ${this.props.pendingSearch || this.props.photos.length > 0 ? '' : 'no-results'}`}
            >
                <div className="top-container">
                    <div className="inputs-logo-wrapper">
                        <div className="logo-container" onClick={() => {this.props.dispatch(actions.type(''))}}>CelesteBank</div>
                        <div className="inputs-container">
                            <Search placeholder='Rechercher une image...'/>
                            {this.props.pendingSearch || this.props.photos.length > 0 ? (
                                <select onChange={(e) => {this.props.dispatch(actions.selectLicense(e.target.value))}}>
                                    <option value="">-- Licence --</option>
                                    <option value="0">All Rights Reserved</option>
                                    <option value="1">Attribution-NonCommercial-ShareAlike License</option>
                                    <option value="2">Attribution-NonCommercial License</option>
                                    <option value="3">Attribution-NonCommercial-NoDerivs License</option>
                                    <option value="4">Attribution License</option>
                                    <option value="5">Attribution-ShareAlike License</option>
                                    <option value="6">Attribution-NoDerivs License</option>
                                    <option value="7">No known copyright restrictions</option>
                                    <option value="8">United States Government Work</option>
                                    <option value="9">Public Domain Dedication (CC0)</option>
                                    <option value="10">Public Domain Mark</option>
                                </select>
                            ) : undefined}
                            <div className='btns-container'>
                                <Button text='Recherche'/>
                                <Button text="J'ai de la chance"/>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.pendingSearch || this.props.photos.length > 0 ? (
                    <div className='results-container'>
                        <Gallery/>
                    </div>
                ) : undefined}
            </div>
        )
    }
}

interface Props {
    pendingSearch: boolean
    photos: []
    dispatch: any
}

export default connect(Layout.mapStateToProps)(Layout);
