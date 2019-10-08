import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class Search extends React.Component<Props> {
    render() {
        return (
            <div className='search-container'>
                <input id='search' type="text" placeholder={this.props.placeholder}/>
                <FontAwesomeIcon icon={faSearch}/>
            </div>
        )
    }
}

interface Props {
    placeholder: string
}

export default Search
