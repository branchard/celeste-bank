import * as React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {connect} from 'react-redux';
import {actions} from './store/core';

class Search extends React.Component<Props> {
    static mapStateToProps = (state: any) => ({
        searchValue: state.core.searchValue,
    });

    render() {
        return (
            <div className='search-container'>
                <input id='search' type="text" placeholder={this.props.placeholder} value={this.props.searchValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.props.dispatch(actions.type(e.target.value))}}/>
                <FontAwesomeIcon icon={faSearch}/>
            </div>
        )
    }
}

interface Props {
    searchValue: string
    placeholder: string
    dispatch: (arg0: any) => any
}

export default connect(Search.mapStateToProps)(Search);
