import React, {Component} from 'react'
import { getAllFields } from '../../services/fieldService'
import { Table, Button, Form } from 'react-bootstrap'
import io from 'socket.io-client'
import {API_URL as BASE_API_URL} from '../../services/variableService'
import { notifyAlert } from '../../services/notificationService' 
import map from '../../assets/img/map.svg'
import './index.css'
import SimpleMap from '../MapModal'
import '../../application.css'

class ListFields extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: [],
            filtered_fields: [],
            current_field: {},
            showModal: false
        }

        this.setFields = this.setFields.bind(this)
        this.connectToSocket = this.connectToSocket.bind(this)
        this.openMapModal = this.openMapModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.filterTable = this.filterTable.bind(this)

    }

    openMapModal = (field) => {
        this.setState({current_field: field})
        this.setState({showModal: true})
    }

    handleCloseModal() {
        this.setState({showModal: false})
    }

    connectToSocket = () => {
        const socket = io(BASE_API_URL)
        socket.on('send_created_data', data => {
            if (data.type == "field") {
                this.setState({fields: [...this.state.fields, data]})
                notifyAlert(`Foi criada uma novo campo de código ${data.code}`)
            }
        })
    }

    componentWillMount() {
        this.setFields()
    }

    componentDidMount() {
        this.connectToSocket()
    }
  
    setFields = async () => {
        const fields = await getAllFields()
        this.setState({fields: fields.data, filtered_fields: fields.data})
    }

    filterTable = (e) => {
        e.preventDefault()
        const searchedValue = document.getElementById("search-field").value
        if(searchedValue.length) {
            const newFields = this.state.fields.filter(field => String(field.code).indexOf(searchedValue) >= 0)
            this.setState({filtered_fields: newFields})
        } else {
            this.setState({filtered_fields: this.state.fields})
        }
    }

    render() {
        return (
            <div>
                {this.state.showModal ?
                    <div>
                        <Button className="back-btn" onClick={() => this.handleCloseModal()} variant="primary" size="sm">
                            🡠 Retornar a página anterior
                        </Button>
                        <SimpleMap field={this.state.current_field} handleClose={this.handleCloseModal} show={this.state.showModal}/>
               
                    </div>
                    :
                    <div>
                        <div className="filter-content">
                            <span className="filter-label">Pesquisar por código</span>
                            <Form.Control className="filter-input" id="search-field" onChange={(e)=>this.filterTable(e)} type="text" placeholder="Insira o código" />
                        </div>
                        <Table id="field-table" className="elements-table" striped bordered hover>
                            <thead>
                                <tr>
                                <th>Código do Campo</th>
                                <th>Latitude</th>
                                <th>Longitude</th>
                                <th>Código da fazenda associada</th>
                                <th>Visualizar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.filtered_fields.map((field) => (
                                    <tr key={field.code}>
                                        <td>{field.code}</td>
                                        <td>{field.latitude}</td>
                                        <td>{field.longitude}</td>
                                        <td>{field.farm_code}</td>
                                        <td><img className="map-image" onClick={()=>this.openMapModal(field)} src={map}/></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>

            }
               
            </div>

        )
    }
}

export default ListFields