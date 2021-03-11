import React, { Component } from 'react'
import './index.css'
import { Form, Button } from 'react-bootstrap'
import { notifyFailure, notifySuccess } from '../../services/notificationService'
import {getAllHarvests} from '../../services/harvestService'
import { registerFarm } from '../../services/farmService' 
import Swal from 'sweetalert2'
import '../../application.css'


class RegisterFarm extends Component {

    constructor (props) {
        super(props)
        this.state = {
            code: "",
            name: "",
            selected_harvest_id: "",
            harvests: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setHarvests = this.setHarvests.bind(this)

    }

    componentWillMount () {
        this.setHarvests()
    }

    setHarvests = async () => {
        const harvests = await getAllHarvests()
        this.setState({harvests: harvests.data})
    }


    handleChange(event) {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    async handleSubmit(event) {
        event.preventDefault()
        registerFarm(this.state)
        .then((response) => {
            const farm = response.data
            farm.type = 'farm'
            this.props.socket.emit("created_object", farm)
            Swal.fire({
                title: 'Sucesso!',
                icon: 'success',
                text: 'Sua fazenda foi cadastrada com sucesso!',
                })
        },
        (error) => {
            notifyFailure("Ocorreu algum problema na criação dessa fazenda. Tente novamente com outros dados.")
            }
        )
    }

    render() {
        const { code, name, selected_harvest_id } = this.state

        return (
            <div className="register">
                <h1>Registre sua Fazenda</h1>
               <Form className="field" onSubmit={this.handleSubmit}>
                <Form.Group controlId="fieldCode">
                    <Form.Label>Código</Form.Label>
                    <Form.Control className="input-form" required type="number" name="code" value={code} onChange={this.handleChange} placeholder="Insira um código para sua fazenda" />
                </Form.Group>

                <Form.Group controlId="fieldName">
                    <Form.Label>Nome da fazenda</Form.Label>
                    <Form.Control className="input-form" required type="text" name="name" value={name} onChange={this.handleChange} placeholder="Insira um nome para sua fazenda" />
                </Form.Group>

                <Form.Label>Associe essa fazenda a uma safra</Form.Label>
                <Form.Control name="selected_harvest_id" value={selected_harvest_id} onChange={this.handleChange} as="select">
                    <option value="" >Selecione uma safra para continuar</option>
                    {this.state.harvests.map((harvest, index) => (
                        <option key={harvest.code} value={harvest.code}>{harvest.code}</option>
                    ))}
                </Form.Control>

                <Button className="harvest-btn" variant="primary" type="submit">
                    Cadastrar
                </Button>
            </Form>
            </div>
        )
    }
}

export default RegisterFarm;