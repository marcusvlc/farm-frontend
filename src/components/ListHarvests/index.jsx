import React, {Component} from 'react'
import { getAllHarvests } from '../../services/harvestService'
import { Table, Form } from 'react-bootstrap'
import io from 'socket.io-client'
import {API_URL as BASE_API_URL} from '../../services/variableService'
import { notifyAlert } from '../../services/notificationService' 

class ListHarvest extends Component {
    constructor(props) {
        super(props)
        this.state = {
            harvests: [],
            filtered_harvests: []
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
    }

    componentDidMount() {
        this.connectToSocket()
    }
  
    setHarvests = async () => {
        const harvests = await getAllHarvests()
        this.setState({harvests: harvests.data, filtered_harvests: harvests.data})
    }

    filterTable = (e) => {
        e.preventDefault()
        const searchedStart = new Date(document.getElementById("search-field-start").value).getTime()
        const searchedEnd = new Date(document.getElementById("search-field-end").value).getTime()

        if(!isNaN(searchedStart) && !isNaN(searchedEnd)) {
            let harvestStart = new Date()
            let harvestEnd = new Date()
            const newValues = this.state.harvests.filter(harvest => {
                harvestStart = new Date(harvest.start_at).getTime()
                harvestEnd = new Date(harvest.ended_at).getTime()
                return ((harvestStart >= searchedStart) && (searchedEnd >= harvestEnd))
            })
            this.setState({filtered_harvests: newValues})
        } else {
            this.setState({filtered_harvests: this.state.harvests})
        }
    }


    render() {
        return (
            <div>
                <div className="filter-content">
                    <span className="filter-label">Filtrar por data de ínicio</span>
                    <Form.Control className="filter-input" id="search-field-start" onChange={(e)=>this.filterTable(e)} type="date" placeholder="Insira uma data" />
                    <span className="filter-label second-camp">Filtrar por data de finalização</span>
                    <Form.Control className="filter-input" id="search-field-end" onChange={(e)=>this.filterTable(e)} type="date" placeholder="Insira uma data" />
                </div>
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
                    {this.state.filtered_harvests.map((harvest) => (
                        <tr key={harvest.code}>
                            <td>{harvest.code}</td>
                            <td>{new Date(harvest.start_at).toLocaleDateString()}</td>
                            <td>{new Date(harvest.ended_at).toLocaleDateString()}</td>
                            <td>{harvest.mill_code}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            </div>
            
        )
    }
}

export default ListHarvest