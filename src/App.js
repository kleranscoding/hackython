import React, { Component } from 'react';
// import logo from './logo.svg';
import signinLogo from './signinbtn@3x.png';
import joinNow from './Joinnow@3x.png';
import peerlogo from './Linkedin_Peer_Logo-03.png';
import { Link } from 'react-router-dom';
// import LoginPage from '../../components/LoginPage/LoginPage';

import './App.css';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup'



import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {
  constructor() {
    super();
    this.state = {

  
    };
  }

  render() {
    return (
      <div className="App">
        <div className="heading"><h3>Explore. Connect. Inspire</h3></div>
        <section className="peerLogo" id="html">
          <img src={peerlogo} height={50} width={118} alt="logo" /><br></br>
        </section>
        <div className="LoginButton">
          <img src={signinLogo} height={50} width={200} />
        </div>
        <div className="JoinNow">
          <img src={joinNow} height={43} width={130} />
        </div>
      </div>
      );
    }
  }
  
  export default App;
     
        

          
      
       
    
