import React, { Component } from 'react'
import './index.css'
import { Form, Button } from 'react-bootstrap'
import { getAllMills }  from '../../services/millService'
import { notifyFailure, notifySuccess } from '../../services/notificationService'
import {registerHarvest} from '../../services/harvestService'
import Swal from 'sweetalert2'
import io from "socket.io-client";
import '../../application.css'


class RegisterHarvest extends Component {

    constructor (props) {
        super(props)
        this.state = {
            code: "",
            start_date: "",
            end_date: "",
            selected_mill_id: "",
            mills: []
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.setMills = this.setMills.bind(this)

    }

    componentWillMount () {
        this.setMills()
    }

    setMills = async () => {
        const mills = await getAllMills()
        this.setState({mills: mills.data})
    }


    handleChange(event) {
        event.preventDefault()
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    async handleSubmit(event) {
        event.preventDefault()
        const { selected_mill_id, start_date, end_date } = this.state;
        const start = new Date(start_date)
        const end = new Date(end_date)
        if (end < start) {
            notifyFailure("A data de finalização da safra deve ser mais recente que a data de ínicio")
        } else if (selected_mill_id == "") {
            notifyFailure("Selecione ao menos uma usina para associar a sua safra")
        } else {
            registerHarvest(this.state)
            .then( (response) => {
                const harvest = response.data
                harvest.type = 'harvest'
                this.props.socket.emit("created_object", harvest)
                Swal.fire({
                    title: 'Sucesso!',
                    icon: 'success',
                    text: 'Sua safra foi cadastrada com sucesso!',
                  })
            },
            (error) => {
                notifyFailure("Ocorreu algum problema na criação da safra. Tente novamente com outros dados.")
                }
             )
        }
    }

    render() {
        const { code, start_date, end_date, selected_mill_id } = this.state

        return (
            <div className="register">
                <h1>Registre sua Safra</h1>
               <Form className="field" onSubmit={this.handleSubmit}>
                <Form.Group controlId="fieldCode">
                    <Form.Label>Código</Form.Label>
                    <Form.Control className="input-form" required type="number" name="code" value={code} onChange={this.handleChange} placeholder="Insira um código para sua safra" />
                </Form.Group>

                <Form.Group controlId="fieldStartDate">
                    <Form.Label>Data de ínicio da safra</Form.Label>
                    <Form.Control className="input-form" required type="date" name="start_date" value={start_date} onChange={this.handleChange} placeholder="Insira a data de ínicio" />
                </Form.Group>

                <Form.Group controlId="fieldEndDate">
                    <Form.Label>Data de finalização da safra</Form.Label>
                    <Form.Control className="input-form" className="input-form" required type="date" name="end_date" value={end_date} onChange={this.handleChange} placeholder="Insira a data de finalização" />
                </Form.Group>

                <Form.Label>Associe essa safra a uma usina</Form.Label>
                <Form.Control name="selected_mill_id" value={selected_mill_id} onChange={this.handleChange} as="select">
                    <option value="" >Selecione uma usina para continuar</option>
                    {this.state.mills.map((mill, index) => (
                        <option key={mill.id} value={mill.id}>{mill.name}</option>
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

export default RegisterHarvest;