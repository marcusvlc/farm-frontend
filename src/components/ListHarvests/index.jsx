import React, {Component} from 'react'
import { getAllHarvests } from '../../services/harvestService'
import { Table } from 'react-bootstrap'
import io from 'socket.io-client'
import {API_URL as BASE_API_URL} from '../../services/variableService'
import { notifyAlert } from '../../services/notificationService' 

class ListHarvest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            harvests: []
        }

        this.setHarvests = this.setHarvests.bind(this)
        this.connectToSocket = this.connectToSocket.bind(this)

    }

    connectToSocket = () => {
        const socket = io(BASE_API_URL)
        socket.on('send_created_data', data => {
            if (data.type == "harvest") {
                this.setState({harvests: [...this.state.harvests, data]})
                notifyAlert(`Foi criada uma nova safra de código ${data.code}`)
            }
        })
    }

    componentWillMount() {
        this.setHarvests()
        console.log(this.state)
    }

    componentDidMount() {
        this.connectToSocket()
    }
  
    setHarvests = async () => {
        const harvests = await getAllHarvests()
        this.setState({harvests: harvests.data})
    }

    render() {
        return (
            <Table className="elements-table" striped bordered hover>
                <thead>
                    <tr>
                    <th>Código da safra</th>
                    <th>Data de ínicio</th>
                    <th>Data de finalização</th>
                    <th>Código da usina associada</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.harvests.map((harvest) => (
                        <tr key={harvest.code}>
                            <td>{harvest.code}</td>
                            <td>{new Date(harvest.start_at).toLocaleDateString()}</td>
                            <td>{new Date(harvest.ended_at).toLocaleDateString()}</td>
                            <td>{harvest.mill_code}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
}

export default ListHarvest