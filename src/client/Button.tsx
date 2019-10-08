import * as React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

class Button extends React.Component<Props> {
    render() {
        return (
            <input className="btn" value={this.props.text} type="submit"/>
        )
    }
}

interface Props {
    text: string,
}

export default Button
