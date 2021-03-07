import React, {Component} from 'react'
import './index.css'
import RegisterHarvest from '../RegisterHarvest'
import ListHarvest from '../ListHarvests'
import '../../application.css'

class HarvestPage extends Component {
    render() {
        return (
            <div className="content">
                <div className="register-content">
                    <RegisterHarvest socket={this.props.socket}/>
                </div>
                <div className="list-content">
                    <ListHarvest socket={this.props.socket}/>
                </div>
            </div>
        )
    }
}

export default HarvestPage