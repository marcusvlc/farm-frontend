import React, { Component } from 'react'
import './index.css'

class Header extends Component {
    render() {
        return (
            <div className="header">
                <h1>Seja bem-vindo ao My Farm!</h1>
                <span>Essa é uma aplicação web que irá te ajudar a manusear todos os aspectos da sua fazenda</span>
            </div>
        )
    }
}

export default Header;