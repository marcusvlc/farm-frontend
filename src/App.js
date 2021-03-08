import NavBarComponent from './components/Navbar'
import HomePage from './components/HomePage'
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import MillPage from './components/MillPage'
import React, { Component } from 'react'
import io from 'socket.io-client'
import {API_URL as BASE_API_URL} from './services/variableService'
import HarvestPage from './components/HarvestPage'
import FarmPage from './components/FarmPage'
import FieldPage from './components/FieldPage'

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
              <Route path="/" exact component={() => <HomePage/>}/>
              <Route path="/register-farm" exact component={() => <FarmPage socket={this.state.socket}/>}/>
              <Route path="/register-field" exact component={() => <FieldPage socket={this.state.socket}/>}/>
              <Route path="/register-mill" exact component={() => <MillPage socket={this.state.socket} />}/>
              <Route path="/register-harvest" exact component={() => <HarvestPage socket={this.state.socket}/>}/>
            </Switch>
        </BrowserRouter>
          
      </div>
    );
  }
}

export default App;
