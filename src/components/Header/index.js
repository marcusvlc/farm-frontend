import React, { Component } from 'react'
import './index.css'
import {Carousel } from 'react-bootstrap'

class Header extends Component {
    render() {
        return (
            <div>
                <Carousel>
                    <Carousel.Item className="carousel-item">
                        <img
                        className="d-block w-100"
                        src="https://scontent.fjdo10-1.fna.fbcdn.net/v/t1.0-9/124706638_3751137494978995_4595097779702065244_o.jpg?_nc_cat=106&ccb=1-3&_nc_sid=e3f864&_nc_eui2=AeG5uNu6sWNlxp1yn7M6ta-goLledZtYKRGguV51m1gpEcoSKDK93JylLxKFxrGkPXBknomAM2qWYw-_g9XVQMwm&_nc_ohc=hpDSwMFotpwAX9e2ioO&_nc_ht=scontent.fjdo10-1.fna&oh=0b391b785df0c1c7eb63cb8a96c01a64&oe=606CC705"
                        alt="First slide"
                        />
                        <Carousel.Caption>
                        <h1 className="slide-title">Seja bem-vindo ao My Farm!</h1>
                        <p className="slide-subtitle">Aqui você poderá controlar todas suas ações referentes a fazendas, colheitas, usinas e campos.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="carousel-item">
                        <img
                        className="d-block w-100"
                        src="https://images.unsplash.com/photo-1613304697989-fa76466d61ae?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1867&q=80"
                        alt="Second slide"
                        />

                        <Carousel.Caption>
                        <h1 className="slide-title">Manuseio total de sua fazenda</h1>
                        <p className="slide-subtitle">Cadastre sua fazenda, campos, usinas e safras para manter total controle de sua produção.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item className="carousel-item">
                        <img
                        className="d-block w-100"
                        src="https://cdn.hipwallpaper.com/i/32/39/PJcxfV.jpg"
                        alt="Third slide"
                        />

                        <Carousel.Caption>
                        <h1 className="slide-title">Visualize seu campo</h1>
                        <p className="slide-subtitle">O My Farm permite que você visualize seu campo utilizando o Google Maps!</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    </Carousel>
            </div>
        )
    }
}

export default Header;