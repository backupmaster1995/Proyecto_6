import React from 'react'
import PropTypes from 'prop-types';

export default function Header({title}) {
    return (
        <header className="header-container">
            <h1 className="main-title">{title}</h1>
        </header>
    )
}

Header.propTypes = {
    title : PropTypes.string.isRequired
}

