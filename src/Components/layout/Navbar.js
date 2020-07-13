import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

 const Navbar = (props) => {

        return (
            <nav className="navbar btn-success">
                <h1><i className={props.icon}></i> {props.title}</h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                </ul>
            </nav>
        )
    }
    Navbar.propTypes = {
        title:PropTypes.string.isRequired,
        icon:PropTypes.string.isRequired,
    }
    Navbar.defaultProps = {
     title:'Github_finder',
     icon:'fab fa-github'
    };

export default Navbar
