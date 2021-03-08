import React, { Component} from 'react'
import './index.css'

class Footer extends Component {
    render() {
        return (
            <footer className="bg-primary text-center text-lg-start">
                <div className="container p-4">
                    <div className="row">
                    <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Sobre</h5>

                        <p>
                        Desenvolvido para fins educativos. Aplicação feita para controle total de sua fazenda.
                        </p>
                    </div>

                    <div className="contacts col-lg-3 col-md-6 mb-4 mb-md-0">
                        <h5 className="text-uppercase">Contatos</h5>

                        <ul className="list-unstyled mb-0">
                        <li>
                            <a href="http://github.com/marcusvlc" target="_blank" className="text-dark">Github</a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/marcus-vinicius-172210171/" target="_blank" className="text-dark">Linkedin</a>
                        </li>
                        <li>
                            <a href="mailto:marcus.costa@ccc.ufcg.edu.br" target="_blank" className="text-dark">E-mail</a>
                        </li>
                        </ul>
                    </div>
                    </div>
                </div>

                <div className="text-center p-3 copy">
                    © {new Date().getFullYear()} Copyright:<br/>
                    <span>Feito com ❤️️ por @marcusvlc</span>
                </div>
            </footer>
        )
    }
}

export default Footer