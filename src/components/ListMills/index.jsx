import React, {Component} from 'react'
import { getAllMills } from '../../services/millService'
import { Table } from 'react-bootstrap'
import io from 'socket.io-client'
import BASE_API_URL from '../../services/variableService'
import { notifyAlert } from '../../services/notificationService' 

class ListMills extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mills: []
        }

        this.setMills = this.setMills.bind(this)
        this.connectToSocket = this.connectToSocket.bind(this)

    }

    connectToSocket = () => {
        const socket = io(BASE_API_URL)
        socket.on('send_created_data', data => {
            if (data.type == "mill") {
                this.setState({mills: [...this.state.mills, data]})
                notifyAlert(`Foi criada uma nova usina de ID ${data.id} e nome ${data.name}`)
            }
        })
    }

    componentWillMount() {
        this.setMills()
    }

    componentDidMount() {
        this.connectToSocket()
    }
  
    setMills = async () => {
        const mills = await getAllMills()
        this.setState({mills: mills.data})
    }

    render() {
        return (
            <Table className="elements-table" striped bordered hover>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Nome da Usina</th>
                    <th>Criada em</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.mills.map((mill, index) => (
                        <tr key={mill.id}>
                            <td>{index}</td>
                            <td>{mill.name}</td>
                            <td>{new Date(mill.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )
    }
}

export default ListMills