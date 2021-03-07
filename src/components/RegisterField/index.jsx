import React, { Component } from 'react'
// import './index.css'
import { Form, Button } from 'react-bootstrap'
import { registerField }  from '../../services/fieldService'
import '../../application.css'

class RegisterField extends Component {

    constructor (props) {
        super(props)
        this.state = {
            code: "",
            latitude: "",
            longitude: "",
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleChange(event) {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({ [name]: parseInt(value) })
    }

    handleSubmit(event) {
        event.preventDefault()
        registerField(this.state)
        
    }

    render() {
        const { code, latitude, longitude } = this.state

        return (
            <div className="register">
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

                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
            </div>
        )
    }
}

export default RegisterField;