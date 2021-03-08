import React, { Component } from 'react'
// import './index.css'
import { Form, Button } from 'react-bootstrap'
import { registerField }  from '../../services/fieldService'
import '../../application.css'
import Swal  from 'sweetalert2'
import { notifyFailure } from '../../services/notificationService'
import { getAllFarms } from '../../services/farmService'

class RegisterField extends Component {

    constructor (props) {
        super(props)
        this.state = {
            code: "",
            latitude: "",
            longitude: "",
            farms: [],
            selected_farm_id: ""
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setFarms = this.setFarms.bind(this)

    }

    setFarms = async () => {
        const farms = await getAllFarms()
        this.setState({farms: farms.data})
    }

    handleChange(event) {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({ [name]: parseInt(value) })
    }

    componentWillMount() {
        this.setFarms()
    }

    async handleSubmit(event) {
        event.preventDefault()
        registerField(this.state).then((response) => {
            const field = response.data
            field.type = 'field'
            this.props.socket.emit("created_object", field)
            Swal.fire({
                title: 'Sucesso!',
                icon: 'success',
                text: 'Seu campo foi cadastrado com sucesso!',
                })
        },
        (error) => {
            notifyFailure("Ocorreu algum problema na criação desse campo. Tente novamente com outros dados.")
            }
        )

        
    }

    render() {
        const { code, latitude, longitude, selected_farm_id } = this.state

        return (
            <div className="register">
                <h1>Registre um novo Campo</h1>
               <Form  className="field" onSubmit={this.handleSubmit}>
                <Form.Group controlId="fieldCode">
                    <Form.Label>Código do Campo</Form.Label>
                    <Form.Control className="input-form" required type="number" name="code" value={code} onChange={this.handleChange} placeholder="Insira o valor do código" />
                </Form.Group>

                <Form.Group controlId="fieldLatitude">
                    <Form.Label>Latitude</Form.Label>
                    <Form.Control className="input-form" required type="number" name="latitude" value={latitude} onChange={this.handleChange} placeholder="Forneça a latitude do campo" />
                </Form.Group>

                <Form.Group controlId="fieldLongitude">
                    <Form.Label>Longitude</Form.Label>
                    <Form.Control className="input-form" required type="number" name="longitude" value={longitude} onChange={this.handleChange} placeholder="Forneça a longitude do campo" />
                </Form.Group>

                <Form.Control name="selected_farm_id" value={selected_farm_id} onChange={this.handleChange} as="select">
                    <option value="" >Selecione uma fazenda para continuar</option>
                    {this.state.farms.map((farm, index) => (
                        <option key={farm.code} value={farm.code}>{farm.code}</option>
                    ))}
                </Form.Control>

                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
            </div>
        )
    }
}

export default RegisterField;