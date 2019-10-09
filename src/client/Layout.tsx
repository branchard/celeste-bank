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

    render() {
        return (
            <div className={`app-container ${this.props.pendingSearch || this.props.photos.length > 0 ? '' : 'no-results'}`}>
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
        )
    }
}

interface Props {
    pendingSearch: boolean,
    photos: []
}

export default connect(Layout.mapStateToProps)(Layout);
