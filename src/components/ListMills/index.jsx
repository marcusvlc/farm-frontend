import React, {Component} from 'react'
import { getAllMills } from '../../services/millService'
import { Table, Form } from 'react-bootstrap'
import io from 'socket.io-client'
import {API_URL as BASE_API_URL} from '../../services/variableService'
import { notifyAlert } from '../../services/notificationService' 

class ListMills extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mills: [],
            filtered_mills: []
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
        this.setState({mills: mills.data, filtered_mills: mills.data})
    }


    filterTable = (e) => {
        e.preventDefault()
        const searchedValue = document.getElementById("search-field").value
        if(searchedValue.length) {
            const newValues = this.state.mills.filter(mill => String(mill.name).indexOf(searchedValue) >= 0)
            this.setState({filtered_mills: newValues})
        } else {
            this.setState({filtered_mills: this.state.mills})
        }
    }

    render() {
        return (
            <div>
                <div className="filter-content">
                    <span className="filter-label">Pesquisar por nome</span>
                    <Form.Control className="filter-input" id="search-field" onChange={(e)=>this.filterTable(e)} type="text" placeholder="Insira o nome" />
                </div>
                <Table className="elements-table" striped bordered hover>
                <thead>
                    <tr>
                    <th>Nome da Usina</th>
                    <th>Criada em</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.filtered_mills.map((mill, index) => (
                        <tr key={mill.id}>
                            <td>{mill.name}</td>
                            <td>{new Date(mill.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            
        )
    }
}

export default ListMills