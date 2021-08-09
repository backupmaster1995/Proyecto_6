import React from 'react'
import PropTypes from 'prop-types';

export default function Error({message}) {
    return (
            <p className="red darken-4 error">{message}</p>
    )
}

Error.propTypes = {
    message : PropTypes.string.isRequired
}

