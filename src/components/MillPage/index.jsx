import React, {Component} from 'react'
import './index.css'
import ListMills from '../ListMills'
import RegisterMill from '../RegisterMill'
import '../../application.css'

class MillPage extends Component {
    render() {
        return (
            <div className="content">
                <div className="register-content">
                    <RegisterMill socket={this.props.socket}/>
                </div>
                <div className="list-content">
                    <ListMills socket={this.props.socket}/>
                </div>
            </div>
        )
    }
}

export default MillPage