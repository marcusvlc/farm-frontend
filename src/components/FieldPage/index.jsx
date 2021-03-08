import React, {Component} from 'react'
import RegisterField from '../RegisterField'
import '../../application.css'
import ListFields from '../ListFields'

class FieldPage extends Component {
    render() {
        return (
            <div className="content">
                <div className="register-content">
                    <RegisterField socket={this.props.socket}/>
                </div>
                <div className="list-content">
                    <ListFields/>
                </div>
            </div>
        )
    }
}

export default FieldPage