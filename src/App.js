import NavBarComponent from './components/Navbar'
import Header from './components/Header'
import RegisterField from './components/RegisterField'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import RegisterHarvest from './components/RegisterHarvest';
import MillPage from './components/MillPage'
import React, { Component } from 'react'
import io from 'socket.io-client'
import BASE_API_URL from './services/variableService'
import HarvestPage from './components/HarvestPage'

class  App extends Component {

  constructor(props) {
    super(props)
    this.state = {
        socket: null,
    }
    this.connectToSocket = this.connectToSocket.bind(this)
  }

  componentWillMount() {
    this.connectToSocket()
  }

  connectToSocket = () => {
    const socket = io(BASE_API_URL)
    this.setState({socket})
  }
  
  render () {
    return (
      <div className="App">
        <BrowserRouter>
          <NavBarComponent/>
            <Switch>
              <Route path="/" exact component={() => <Header/>}/>
              <Route path="/register-field" exact component={() => <RegisterField/>}/>
              <Route path="/register-mill" exact component={() => <MillPage socket={this.state.socket} />}/>
              <Route path="/register-harvest" exact component={() => <HarvestPage socket={this.state.socket}/>}/>
            </Switch>
        </BrowserRouter>
          
      </div>
    );
  }
}

export default App;
