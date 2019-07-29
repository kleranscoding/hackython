import React, { Component } from 'react';
// import logo from './logo.svg';
import inlogo from './In-logo.png';
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
        <section className="peerLogo" id="html">
          <img src={peerlogo} height={58} width={118} alt="logo" /><br></br>
          {/* <img src={signinbutton} height={60} width={200}/><br></br> */}
        </section>
        <div>

        </div>
          {/* <ButtonGroup vertical>
            <Link to="/login"><Button variant="primary" size="lg" className="SignInButton">
              Sign In with LinkedIn
            </Button></Link>

            <Button variant="secondary" size="lg" className="JoinButton">
              Join now
            </Button>
          </ButtonGroup> */}
      </div>
      );
    }
  }
  
  export default App;
     
        

          
      
       
    
