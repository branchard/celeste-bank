import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class SearchButton extends React.Component<Props> {
    render() {
        return (
            <input className="gNO89b" value="Recherche" aria-label="Recherche Google" name="btnK" type="submit"
                   data-ved="0ahUKEwjO4ZOZsIzlAhVE1eAKHVbdApIQ4dUDCAo"/>
        )
    }
}

interface Props {
}

export default SearchButton
