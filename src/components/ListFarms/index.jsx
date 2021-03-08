import React, {Component} from 'react'
import { getAllFarms } from '../../services/farmService'
import { Table, Form } from 'react-bootstrap'
import io from 'socket.io-client'
import {API_URL as BASE_API_URL} from '../../services/variableService'
import { notifyAlert } from '../../services/notificationService' 

class ListFarms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            farms: [],
            filtered_farms: []
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
        this.setState({farms: farms.data, filtered_farms: farms.data})
    }

    filterTable = (e) => {
        e.preventDefault()
        const searchedValueName = document.getElementById("search-field-name").value
        const searchedValueCode = document.getElementById("search-field-code").value
        let newValues = []
        if(searchedValueName.length && searchedValueCode.length) {
            newValues = this.state.filtered_farms.filter(farm => (
                String(farm.name).indexOf(searchedValueName) >= 0) && String(farm.code).indexOf(searchedValueCode)
            )
        } else if(searchedValueName.length && !searchedValueCode.length) {
            newValues = this.state.filtered_farms.filter(farm => (
                String(farm.name).indexOf(searchedValueName) >= 0)
            )
        } else if(!searchedValueName.length && searchedValueCode.length) {
            newValues = this.state.filtered_farms.filter(farm => (
                String(farm.code).indexOf(searchedValueCode) >= 0)
            )
        } else {
            newValues = this.state.farms
        }

        this.setState({filtered_farms: newValues})
    }

    render() {
        return (
            <div>
                <div className="filter-content">
                    <span className="filter-label">Pesquisar por nome</span>
                    <Form.Control className="filter-input" id="search-field-name" onChange={(e)=>this.filterTable(e)} type="text" placeholder="Insira o nome" />
                    <span className="filter-label second-camp">Pesquisar por código</span>
                    <Form.Control className="filter-input" id="search-field-code" onChange={(e)=>this.filterTable(e)} type="text" placeholder="Insira o código" />
                </div>
                <Table className="elements-table" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Código da safra</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.filtered_farms.map((farm) => (
                            <tr key={farm.code}>
                                <td>{farm.code}</td>
                                <td>{farm.name}</td>
                                <td>{farm.harvest_code}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            
        )
    }
}

export default ListFarms