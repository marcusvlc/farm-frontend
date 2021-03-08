import React, {Component} from 'react'
import { getAllFarms } from '../../services/farmService'
import { Table } from 'react-bootstrap'
import io from 'socket.io-client'
import {API_URL as BASE_API_URL} from '../../services/variableService'
import { notifyAlert } from '../../services/notificationService' 

class ListFarms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            farms: []
        }

        this.setFarms = this.setFarms.bind(this)
        this.connectToSocket = this.connectToSocket.bind(this)

    }

    connectToSocket = () => {
        const socket = io(BASE_API_URL)
        socket.on('send_created_data', data => {
            if (data.type == "farm") {
                this.setState({farms: [...this.state.farms, data]})
                notifyAlert(`Foi criada uma nova fazenda de código ${data.code}`)
            }
        })
    }

    componentWillMount() {
        this.setFarms()
    }

    componentDidMount() {
        this.connectToSocket()
    }
  
    setFarms = async () => {
        const farms = await getAllFarms()
        this.setState({farms: farms.data})
    }

    render() {
        return (
            <Table className="elements-table" striped bordered hover>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nome</th>
                        <th>Código da safra</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.farms.map((farm) => (
                        <tr key={farm.code}>
                            <td>{farm.code}</td>
                            <td>{farm.name}</td>
                            <td>{farm.harvest_code}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
}

export default ListFarms