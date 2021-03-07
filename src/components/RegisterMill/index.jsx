import React, { Component } from 'react'
import './index.css'
import { Form, Button } from 'react-bootstrap'
import { registerMill }  from '../../services/millService'
import Swal from 'sweetalert2'


class RegisterMill extends Component {

    constructor (props) {
        super(props)
        this.state = {
            name: "",
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    async handleSubmit(event) {
        event.preventDefault()
        const createdMill = await registerMill(this.state)

        if(createdMill.data) {
            const mill = createdMill.data
            mill.type = 'mill'
            this.props.socket.emit("created_object", mill)
            Swal.fire({
                title: 'Sucesso!',
                icon: 'success',
                text: 'Sua usina foi cadastrada com sucesso!',
              })
        }
    }

    render() {
        const { name } = this.state

        return (
            <div className="register">
                <h1>Registre sua Usina</h1>
               <Form className="field" onSubmit={this.handleSubmit}>
                <Form.Group   controlId="fieldName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control className="input-form" required maxLength="40" type="text" name="name" value={name} onChange={this.handleChange} placeholder="Insira o nome da sua Usina" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
            </div>
        )
    }
}

export default RegisterMill;