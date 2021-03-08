import React, {Component} from 'react'
import RegisterFarm from '../RegisterFarm'
import '../../application.css'
import ListFarms from '../ListFarms'

class FarmPage extends Component {
    render() {
        return (
            <div className="content">
                <div className="register-content">
                    <RegisterFarm socket={this.props.socket}/>
                </div>
                <div className="list-content">
                    <ListFarms/>
                </div>
            </div>
        )
    }
}

export default FarmPage