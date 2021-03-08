import React, { Component } from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import logo from '../../assets/img/logo.png'
import './index.css'
import { Link } from 'react-router-dom'

class NavBarComponent extends Component {
    render() {
        return (
        <Navbar className="navbar" bg="primary" variant="dark">
            <Navbar.Brand>
                <Link to='/'>
                    <img className="logo" src={logo}></img>
                    <span className="navbar-element logo-text">MY FARM</span>
                </Link>
            </Navbar.Brand>
            <Nav className="ml-auto">
                <Link to='/register-farm'>
                    <span className="navbar-element">Fazendas</span>
                </Link>
                <Link to='/register-field'>
                    <span className="navbar-element">Campos</span>
                </Link>
                <Link to='/register-mill'>
                    <span className="navbar-element">Usinas</span>
                </Link>
                <Link to='/register-harvest'>
                    <span className="navbar-element">Safras</span>
                </Link>
            </Nav>
        </Navbar>
        )
    }
}

export default NavBarComponent;